import { CommissionHistory, User } from "../generated/schema";
import { ReferralCommissionPaid } from "../generated/NFTItem/NFTPresaleManager";
import { BigInt, log} from "@graphprotocol/graph-ts";

export function commission(event: ReferralCommissionPaid): void {
  log.info("eventReferralCommissionPaid: {}, {}, {}", [event.params.referrer.toHexString(), event.params.buyer.toHexString(), event.params.amount.toString()]);
  let referrerAddress = event.params.referrer.toHexString();
  let buyerAddress = event.params.buyer.toHexString();

  // Create the new CommissionHistory (CommissionHistory entity)
  let commissionId = `${referrerAddress}-${buyerAddress}-${event.block.timestamp.toString()}`;
  let commission = CommissionHistory.load(commissionId);
  if (!commission) {
    commission = new CommissionHistory(commissionId);
  }
  commission.id = commissionId;
  commission.referrer = event.params.referrer.toHex();
  commission.buyer = event.params.buyer.toHex();
  commission.amount = event.params.amount;
  commission.transactionHash = event.transaction.hash.toHexString();
  commission.timestamp = event.block.timestamp;

  // Save the commission
  commission.save();

  if (referrerAddress.trim().toLowerCase() != buyerAddress.trim().toLowerCase()) {
    handleCommissionOnDifferentUsers(referrerAddress, buyerAddress, event);
  } else {
    handleCommissionOnSameUser(referrerAddress, event);
  }
}

function handleCommissionOnDifferentUsers(referrerAddress: string, buyerAddress: string, event: ReferralCommissionPaid): void {
  // Load or create the referrer (User entity)
  let referrer = User.load(referrerAddress);
  if (!referrer) {
    referrer = new User(referrerAddress);
    referrer.itemsOwned = [];
    referrer.totalCommissionPaidAmount = BigInt.fromU32(0);
    referrer.totalCommissionReceivedAmount = BigInt.fromU32(0);
  }

  // Load or create the buyer (User entity)
  let buyer = User.load(buyerAddress);
  if (!buyer) {
    buyer = new User(buyerAddress);
    buyer.itemsOwned = [];
    buyer.totalCommissionPaidAmount = BigInt.fromU32(0);
    buyer.totalCommissionReceivedAmount = BigInt.fromU32(0);
  }

  // Update buyer's total paid commission
  buyer.totalCommissionPaidAmount = buyer.totalCommissionPaidAmount.plus(event.params.amount);

  // Save the buyer
  buyer.save();

  // Update referrer's total received commission
  referrer.totalCommissionReceivedAmount = referrer.totalCommissionReceivedAmount.plus(event.params.amount);

  // Save the referrer
  referrer.save();
}

function handleCommissionOnSameUser(userAddress: string, event: ReferralCommissionPaid): void {
  // Load or create the referrer (User entity)
  let user = User.load(userAddress);
  if (!user) {
    user = new User(userAddress);
    user.itemsOwned = [];
    user.totalCommissionPaidAmount = BigInt.fromU32(0);
    user.totalCommissionReceivedAmount = BigInt.fromU32(0);
  }

  // Update buyer's total paid commission
  user.totalCommissionPaidAmount = user.totalCommissionPaidAmount.plus(event.params.amount);
  user.totalCommissionReceivedAmount = user.totalCommissionReceivedAmount.plus(event.params.amount);

  // Save the buyer
  user.save();
}
