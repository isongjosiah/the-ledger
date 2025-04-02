import { Money } from "../types/money"

export class UserAccount {
  constructor(
    public id: string,
    public userId: string,
    public accountNumber: string,
    public currency: string,
    public availableBalance: Money,
    public pendingDeposits: Money,
    public pendingWithdrawals: Money,
    public pendingTransfers: Money
  ) {
    this.userId = userId
    this.accountNumber = accountNumber
    this.currency = currency
    this.availableBalance = availableBalance
    this.pendingDeposits = pendingDeposits
    this.pendingWithdrawals = pendingWithdrawals
    this.pendingTransfers = pendingTransfers
  }
}
