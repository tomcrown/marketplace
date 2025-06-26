// ts/utils.ts
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { decodeSuiPrivateKey } from '@mysten/sui.js/cryptography';


const { secretKey } = decodeSuiPrivateKey('privateKey');

export const keyPair = Ed25519Keypair.fromSecretKey(secretKey);
export const client = new SuiClient ({ url: getFullnodeUrl('testnet') });
export const PACKAGE_ID = 'packageId';
export const MODULE_NAME = 'moduleName';