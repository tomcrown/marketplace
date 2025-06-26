# 🛒 Sui Widget Marketplace

A fully on-chain decentralized marketplace built on the [Sui blockchain](https://sui.io), enabling users to list, buy, and manage `Widget` NFTs using a custom fungible token.

## 🧩 Features

- ✅ Mint `Widget` NFTs
- 🪙 Buy widgets using a fungible token 
- 📋 List and delist items
- 💰 Sellers can withdraw profits after sales
- ✅ Typescripts for each of the functions

---


## 📁 Project Structure
```
.
├── move/
│ ├── widget.move # NFT definition and minting logic
│ └── marketplace.move # Marketplace logic (listing, buying, delisting, withdrawing)
├── scripts/
│ ├── buy.ts # Buys a listed Widget
│ ├── create.ts # Mints a new Widget NFT
│ ├── list.ts # Lists a Widget NFT for sale
│ ├── withdraw.ts # Withdraws seller profits
│ └── utils.ts # Helper functions 
└── README.md # Project documentation


---

💻 Scripts
All scripts live in the scripts/ folder and use the @mysten/sui.js SDK.

create.ts
Mint a new Widget NFT.

list.ts
List your Widget for sale by calling the list entry function.

buy.ts
Purchase a listed NFT using your fungible token.

withdraw.ts
Withdraw your earnings from the Marketplace balance.

utils.ts
Contains shared helpers for selecting coin objects, signing transactions, or loading configuration.

📦 Move Modules Overview
widget.move
struct Widget { id, name, level }

public entry mint(...) – Mints a new Widget NFT

marketplace.move
struct Listing { id, item, price, seller }

public entry list(...) – List an NFT

public entry buy(...) – Purchase a listed item

public entry delist(...) – Cancel a listing

public entry withdraw(...) – Withdraw profits
