import { Transaction } from "../../../domain/entities/userTransaction";
import { Money } from "../../../domain/types/money";
import {
  ITransactionDocument,
  TransactionModel,
} from "../models/userTransaction";

export class ITransactionRepository implements ITransactionRepository {
  async create(
    transaction: Transaction,
    session?: ClientSession,
  ): Promise<Transaction> {
    const trns: ITransactionDocument = await TransactionModel.create(
      {
        accountId: transaction.accountId,
        transactionType: transaction.transactionType,
        amount: transaction.amount.getAmount(),
        currency: transaction.currency,
        status: transaction.status,
        details: transaction.details,
      },
      { session },
    );
    return new Transaction(
      String(trns._id),
      trns.accountId.toString(),
      trns.transactionType,
      new Money(trns.amount),
      trns.currency,
      trns.status,
      trns.details,
      trns.createdAt,
      trns.updatedAt,
    );
  }

  async findById(id: string): Promise<Transaction | null> {
    const trns = await TransactionModel.findById(id).exec();
    if (!trns) return null;
    return new Transaction(
      String(trns._id),
      trns.accountId.toString(),
      trns.transactionType,
      new Money(trns.amount),
      trns.currency,
      trns.status,
      trns.details,
      trns.createdAt,
      trns.updatedAt,
    );
  }

  async findByAccountId(accountId: string): Promise<Transaction[]> {
    const transactions = await TransactionModel.find({ accountId }).exec();
    return transactions.map(
      (trns) =>
        new Transaction(
          String(trns._id),
          trns.accountId.toString(),
          trns.transactionType,
          new Money(trns.amount),
          trns.currency,
          trns.status,
          trns.details,
          trns.createdAt,
          trns.updatedAt,
        ),
    );
  }

  async update(
    transaction: Transaction,
    session?: ClientSession,
  ): Promise<Transaction> {
    const trns = await TransactionModel.findByIdAndUpdate(
      transaction.id,
      {
        status: transaction.status,
        details: transaction.details,
      },
      { session },
    ).exec();
    if (!trns) throw new Error("Transaction not found");
    return new Transaction(
      String(trns._id),
      trns.accountId.toString(),
      trns.transactionType,
      new Money(trns.amount),
      trns.currency,
      trns.status,
      trns.details,
      trns.createdAt,
      trns.updatedAt,
    );
  }
}
