import { TransactionBlock } from '@mysten/sui.js/transactions';
import { client, keyPair } from './utils';

const PACKAGE_ID = '0x20b8cdb92dd81dea084c8f1122cd856b0a5485d7db97c62509ef3834bfdcbe35';
const MODULE_NAME = 'marketplace';

const MARKETPLACE_ID = '0x3c8e0049398612c9db53971d746844357da77ba97a4baebeae923c173b3b8dd3';

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
