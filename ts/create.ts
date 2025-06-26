import { TransactionBlock } from '@mysten/sui.js/transactions';
import { client, keyPair, PACKAGE_ID, MODULE_NAME } from './utils';

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
