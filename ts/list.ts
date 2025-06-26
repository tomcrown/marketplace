import { TransactionBlock } from '@mysten/sui.js/transactions';
import { client, keyPair, PACKAGE_ID, MODULE_NAME } from './utils';


const MARKETPLACE_ID = 'marketplaceId';
const ITEM_ID = 'itemId'; 
const LIST_PRICE = 100000000; 


async function callList() {
	const tx = new TransactionBlock();

	tx.moveCall({
		target: `${PACKAGE_ID}::${MODULE_NAME}::list`,
		arguments: [
			tx.object(MARKETPLACE_ID),
			tx.object(ITEM_ID),
			tx.pure(LIST_PRICE),
		],
		typeArguments: ['$PACKAGE_ID::widget::Widget', '0x2::sui::SUI']
	});

	const result = await client.signAndExecuteTransactionBlock({
		transactionBlock: tx,
		signer: keyPair,
	});

	console.log('List result:', result);
}

callList().catch(console.error);
