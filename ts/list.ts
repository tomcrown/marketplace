import { TransactionBlock } from '@mysten/sui.js/transactions';
import { client, keyPair } from './utils';


const PACKAGE_ID = '0x<your_package_id>';
const MODULE_NAME = 'marketplace';
const STRUCT_NAME = 'Marketplace';
const MARKETPLACE_ID = '0x<your_marketplace_object_id>';
const ITEM_ID = '0x<your_nft_object_id>'; // NFT or other object to list
const LIST_PRICE = 100000000; // adjust as needed (e.g., 1 SUI = 1_000_000_000)


async function callList() {
	const tx = new TransactionBlock();

	tx.moveCall({
		target: `${PACKAGE_ID}::${MODULE_NAME}::list`,
		arguments: [
			tx.object(MARKETPLACE_ID),
			tx.object(ITEM_ID),
			tx.pure(LIST_PRICE),
		],
		typeArguments: ['0x2::sui::SUI'], // or your custom coin type
	});

	const result = await client.signAndExecuteTransactionBlock({
		transactionBlock: tx,
		signer: keypair,
		requestType: 'WaitForEffectsCert',
	});

	console.log('List result:', result);
}

callList().catch(console.error);
