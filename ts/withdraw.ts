import { TransactionBlock } from '@mysten/sui.js/transactions';
import { client, keyPair, PACKAGE_ID, MODULE_NAME } from './utils';

const MARKETPLACE_ID = 'marketplaceId';

async function callWithdraw() {
	const tx = new TransactionBlock();

	tx.moveCall({
		target: `${PACKAGE_ID}::${MODULE_NAME}::take_profits_and_keep`,
		arguments: [
			tx.object(MARKETPLACE_ID),
		],
		typeArguments: ['0x2::sui::SUI'],
	});

	const result = await client.signAndExecuteTransactionBlock({
		transactionBlock: tx,
		signer: keyPair
	});

	console.log('Withdraw result:', result);
}

callWithdraw().catch(console.error);
