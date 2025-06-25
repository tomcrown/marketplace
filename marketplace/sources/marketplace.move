module marketplace::marketplace;


use sui::table::{Self, Table};
use sui::bag::{Self, Bag};
use sui::coin::Coin;


public struct Marketplace<phantom COIN> has key {
    id: UID,
    items: Bag,
    payments: Table<address, Coin<COIN>>
}



public struct ListingItem has key, store {
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