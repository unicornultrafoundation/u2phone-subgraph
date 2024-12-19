import {tokenPurchase} from "./purchase";
import { NFTPurchased, ReferralCommissionPaid } from '../generated/NFTItem/NFTPresaleManager';
import { commission } from './commission';

export function handlePurchase(event: NFTPurchased): void {
  tokenPurchase(event);
}

export function handleCommissionPaid(event: ReferralCommissionPaid): void {
  commission(event);
}
