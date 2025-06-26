import { TransactionBlock } from '@mysten/sui.js/transactions';
import { client, keyPair } from './utils';

const PACKAGE_ID = '0x20b8cdb92dd81dea084c8f1122cd856b0a5485d7db97c62509ef3834bfdcbe35';
const MODULE_NAME = 'marketplace';
const STRUCT_NAME = 'Marketplace';
const MARKETPLACE_ID = '0x3c8e0049398612c9db53971d746844357da77ba97a4baebeae923c173b3b8dd3';
const ITEM_ID = '0x52bc31abf9aca41a99d8be101471e15d0534031bdd108c9a4101a2abb6fae1f7'; 
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
		typeArguments: ['0x20b8cdb92dd81dea084c8f1122cd856b0a5485d7db97c62509ef3834bfdcbe35::widget::Widget', '0x2::sui::SUI']
	});

	const result = await client.signAndExecuteTransactionBlock({
		transactionBlock: tx,
		signer: keyPair,
		requestType: 'WaitForEffectsCert',
	});

	console.log('List result:', result);
}

callList().catch(console.error);
