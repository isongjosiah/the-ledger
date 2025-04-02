import { Money } from "../types/money";

export class Transaction {
  constructor(
    public id: string,
    public accountId: string,
    public transactionType: string, // e.g., 'deposit', 'withdrawal', 'transfer'
    public amount: Money,          // stored as an integer (e.g., in cents)
    public currency: string,        // ISO 4217 code (e.g., 'USD')
    public status: string,          // e.g., 'processing', 'successful', 'failed'
    public details: Record<string, any>,
    public createdAt: Date,
    public updatedAt: Date
  ){}
}
