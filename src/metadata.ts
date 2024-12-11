// import {ContractAddress} from "./const";
// import {MetadataUpdate} from "../generated/NFTItem/URC4906";
// import {Item, MetadataUpdateRecord, User} from "../generated/schema";
// import {URC721} from "../generated/NFTItem/URC721";

// export function metadataUpdate(event: MetadataUpdate): void {
//   /* load the token from the existing Graph Node */

//   let token = Item.load(event.params._tokenId.toString())
//   if (token) {
//     let nftContract = URC721.bind(ContractAddress)
//     let tokenURIResult = nftContract.try_tokenURI(token.tokenID)
//     if (!tokenURIResult.reverted) {
//       token.tokenURI = tokenURIResult.value;
//     }
//     token.save();
//   }

//   let user = User.load(event.transaction.from.toHexString())
//   if (!user) {
//     user = new User(event.transaction.from.toHexString())
//     user.save()
//   }

//   let updateRecord = MetadataUpdateRecord.load(event.transaction.hash.toHexString())
//   if (!updateRecord) {
//     // its should go here all time
//     updateRecord = new MetadataUpdateRecord(event.transaction.hash.toHexString())
//     updateRecord.actor = user.id;
//     updateRecord.tokenID = event.params._tokenId;
//     updateRecord.save();
//   }




// }


