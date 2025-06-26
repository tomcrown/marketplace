// ts/utils.ts
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { decodeSuiPrivateKey } from '@mysten/sui.js/cryptography';


const { secretKey } = decodeSuiPrivateKey('suiprivkey1qza8ay8cts039ecz6nlsjfkmw5xyejmwtdtlhgs0sjp3ysteqc0zs306jze');

export const keyPair = Ed25519Keypair.fromSecretKey(secretKey);
export const client = new SuiClient ({ url: getFullnodeUrl('testnet') });