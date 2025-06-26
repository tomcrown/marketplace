import { TransactionBlock } from '@mysten/sui.js/transactions';
import { client, keyPair, PACKAGE_ID, MODULE_NAME } from './utils';


const LIST_PRICE = 100000000; 
const ITEM_ID = 'itemId'; 
const MARKETPLACE_ID = 'marketplaceId';

async function callBuy() {
	const tx = new TransactionBlock();


	const [coinForPayment] = tx.splitCoins(tx.gas, [tx.pure(LIST_PRICE)]);

	tx.moveCall({
		target: `${PACKAGE_ID}::${MODULE_NAME}::buy_and_take`,
		arguments: [
			tx.object(MARKETPLACE_ID),
			tx.pure(ITEM_ID),
			coinForPayment,
		],
		typeArguments: ['$PACKAGE_ID::widget::Widget', '0x2::sui::SUI']
	});

	const result = await client.signAndExecuteTransactionBlock({
		transactionBlock: tx,
		signer: keyPair,
	});

	console.log('Buy result:', result);
}

callBuy().catch(console.error);
