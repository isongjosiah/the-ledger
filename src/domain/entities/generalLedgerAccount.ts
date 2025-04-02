import { Money } from "../types/money";

export class GeneralLedger {
  constructor(
    public id: string,
    public accountName: string,
    public accountType: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense',
    public currency: string,
    public balance: Money,
    public createdAt?:Date,
    public updatedAt?:Date
  ){}
}
