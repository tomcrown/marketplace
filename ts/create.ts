import { TransactionBlock } from '@mysten/sui.js/transactions';
import { client, keyPair } from './utils';

const PACKAGE_ID = '0x20b8cdb92dd81dea084c8f1122cd856b0a5485d7db97c62509ef3834bfdcbe35';
const MODULE_NAME = 'marketplace';

async function callCreateMarketplace() {
    const tx = new TransactionBlock();

    tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::create`,
        typeArguments: ['0x2::sui::SUI'], 
    });

    const result = await client.signAndExecuteTransactionBlock({
        signer: keyPair,
        transactionBlock: tx,
    });

    console.log('Created Marketplace:', result);
}

callCreateMarketplace().catch(console.error);
