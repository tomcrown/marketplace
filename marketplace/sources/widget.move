module marketplace::widget;

public struct Widget has key, store {
    id: UID,
}


#[lint_allow(self_transfer)]
public fun mint(ctx: &mut TxContext) {
    let object = Widget {
        id: object::new(ctx),
    };
    transfer::transfer(object, tx_context::sender(ctx));
}