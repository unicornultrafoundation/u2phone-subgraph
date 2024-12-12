import {tokenPurchase} from "./purchase";
import { NFTPurchased } from '../generated/NFTItem/NFTPresaleManager';

export function handlePurchase(event: NFTPurchased): void {
  tokenPurchase(event);
}
