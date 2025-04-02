import { Money } from "../types/money";

export class GeneralLedgerTransaction {
  constructor(
    public id: string,
    public ledgerAccountId: string,  // reference to the GL Account
    public transactionType: 'deposit' | 'withdrawal' | 'transfer', // you may extend as needed
    public debit: Money,   // amount debited (in minor units)
    public credit: Money,  // amount credited (in minor units)
    public amount: Money,  // overall transaction amount (optional, may be redundant)
    public transactionDate: Date,
    public details: Record<string, any>,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
