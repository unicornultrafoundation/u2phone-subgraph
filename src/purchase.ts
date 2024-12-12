import { Item, TransferHistory, User } from "../generated/schema";
import { NFTPurchased } from "../generated/NFTItem/NFTPresaleManager";
import { Address, BigInt, ethereum, log, store } from "@graphprotocol/graph-ts/index"

export function tokenPurchase(event: NFTPurchased): void {
  log.info("eventTokenPurchased: {}, {}", [event.params.tokenId.toString(), event.params.buyer.toHexString()]);
  let buyerAddress = event.params.buyer.toHex();
  let tokenId = event.params.tokenId;

  // Load or create the buyer (User entity)
  let buyer = User.load(buyerAddress);
  if (!buyer) {
    buyer = new User(buyerAddress);
    buyer.itemsOwned = [];
  }

  // Create the new NFT (Item entity)
  let itemId = tokenId.toString();
  let item = Item.load(itemId);
  if (!item) {
    item = new Item(itemId);
  }
  item.owner = buyer.id;
  item.tokenID = tokenId;
  item.transactionHash = event.transaction.hash.toHexString();
  item.createdAt = event.block.timestamp;
  item.updatedAt = BigInt.fromU32(0);

  // Save the NFT
  item.save();

  // Update buyer's owned items
  let itemsOwned = buyer.itemsOwned;
  itemsOwned.push(item.id);
  buyer.itemsOwned = itemsOwned;

  // Save the buyer
  buyer.save();

  // Create a TransferHistory record
  let transferId = event.transaction.hash.toHex();
  let transfer = TransferHistory.load(transferId);
  if (!transfer) {
    transfer = new TransferHistory(transferId);
  }
  transfer.from = null; // No `from` address for minting
  transfer.to = buyer.id;
  transfer.tokenId = tokenId;
  transfer.timestamp = event.block.timestamp;
  transfer.transactionHash = event.transaction.hash.toHexString();

  // Save the transfer record
  transfer.save();
}
