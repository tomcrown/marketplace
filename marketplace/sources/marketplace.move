module marketplace::marketplace;

use sui::table::{Self, Table};
use sui::bag::{Self, Bag};
use sui::coin::{Self, Coin};
use sui::dynamic_object_field as ofield;


const EInvalidAmount: u64 = 0;
const ENotOwner: u64 = 1;

public struct Marketplace<phantom COIN> has key {
    id: UID,
    items: Bag,
    payments: Table<address, Coin<COIN>>
}


public struct Listing has key, store {
    id: UID,
    price: u64,
    owner: address 
}


public fun create<COIN>(ctx: &mut TxContext) {
    let id = object::new(ctx);
    let items = bag::new(ctx);
    let payments = table::new<address, Coin<COIN>>(ctx);

    transfer::share_object(Marketplace<COIN> {
        id,
        items,
        payments
    });
}


public fun list<T: key + store, COIN>(
    marketplace: &mut Marketplace<COIN>,
    item: T,
    price: u64,
    ctx: &mut TxContext
) {
    let item_id = object::id(&item);
    let owner = tx_context::sender(ctx);

    let mut listing = Listing {
        id: object::new(ctx),
        price,
        owner
    };
    
    ofield::add(&mut listing.id, true, item);

    bag::add(&mut marketplace.items, item_id, listing);
}


public fun buy_and_take<T: key + store, COIN>(
    marketplace: &mut Marketplace<COIN>,
    item_id: ID,
    payment: Coin<COIN>,
    ctx: &mut TxContext
){
    let Listing { mut id, price, owner } = bag::remove(&mut marketplace.items, item_id);

    assert!(coin::value(&payment) == price, EInvalidAmount);

    if (table::contains<address, Coin<COIN>>(&marketplace.payments, owner)) {
        coin::join(
            table::borrow_mut<address, Coin<COIN>>(&mut marketplace.payments, owner),
            payment,
        );
    } else {
        table::add(&mut marketplace.payments, owner, payment);
    };


    let item: T = ofield::remove(&mut id, true);
    object::delete(id);


    transfer::public_transfer(item, tx_context::sender(ctx));
}


public fun delist_and_take<T: key + store, COIN>(
    marketplace: &mut Marketplace<COIN>,
    item_id: ID,
    ctx: &mut TxContext
) {
    let Listing { mut id, price: _, owner} = bag::remove(&mut marketplace.items, item_id);

    assert!(tx_context::sender(ctx) == owner, ENotOwner);

    let item: T = ofield::remove(&mut id, true);
    object::delete(id);

    transfer::public_transfer(item, tx_context::sender(ctx));
}


fun take_profits<COIN>(
    marketplace: &mut Marketplace<COIN>,
    ctx: &TxContext
): Coin<COIN> {
    table::remove(&mut marketplace.payments, tx_context::sender(ctx))
}


#[allow(lint(self_transfer))]
public fun take_profits_and_keep<COIN>(
    marketplace: &mut Marketplace<COIN>,
    ctx: &mut TxContext
) {
    let profit = take_profits<COIN>(marketplace, ctx);
    transfer::public_transfer(profit, tx_context::sender(ctx));
}