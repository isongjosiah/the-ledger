import { ClientSession } from "mongoose";
import { Transaction } from "../entities/userTransaction";

export interface ITransactionRepository {
  create(transaction: Transaction, session?:ClientSession): Promise<Transaction>
  findById(id: string): Promise<Transaction | null>;
  findByAccountId(accountId: string): Promise<Transaction[]>
  update(transaction: Transaction, session?:ClientSession): Promise<Transaction>
}
