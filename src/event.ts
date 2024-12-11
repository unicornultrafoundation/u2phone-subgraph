import {tokenTransfer} from "./transfer";
import {Transfer} from "../generated/NFTItem/URC721";
// import {metadataUpdate} from "./metadata";

export function handleTransfer(event: Transfer): void {
  tokenTransfer(event);
}

// export function handleUpdateMetadata(event: MetadataUpdate): void {
//   metadataUpdate(event);
// }