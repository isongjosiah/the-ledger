import { ClientSession } from "mongoose";
import { IGeneralLedgerTransactionRepository } from "../../../domain/interfaces/generalLedgerTransaction";
import { GeneralLedgerTransaction } from "../../../domain/entities/generalLedgerTransaction";
import {
  GeneralLedgerTransactionModel,
  IGeneralLedgerTransactionDocument,
} from "../models/generalLedgerTransaction";
import { Money } from "../../../domain/types/money";

export class GeneralLedgerTransactionRepository
  implements IGeneralLedgerTransactionRepository
{
  async create(
    transaction: GeneralLedgerTransaction,
    session?: ClientSession,
  ): Promise<GeneralLedgerTransaction> {
    const createdDocs: IGeneralLedgerTransactionDocument[] =
      await GeneralLedgerTransactionModel.create(
        [
          {
            ledgerAccountId: transaction.ledgerAccountId,
            transactionType: transaction.transactionType,
            debit: transaction.debit,
            credit: transaction.credit,
            amount: transaction.amount,
            transactionDate: transaction.transactionDate,
            details: transaction.details,
          },
        ],
        { session },
      );
    const created = createdDocs[0];
    return new GeneralLedgerTransaction(
      String(created._id),
      String(created.ledgerAccountId),
      created.transactionType as "deposit" | "withdrawal" | "transfer",
      new Money(created.debit),
      new Money(created.credit),
      new Money(created.amount),
      created.transactionDate,
      created.details,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findById(id: string): Promise<GeneralLedgerTransaction | null> {
    const doc = await GeneralLedgerTransactionModel.findById(id).exec();
    if (!doc) return null;
    return new GeneralLedgerTransaction(
      String(doc._id),
      String(doc.ledgerAccountId),
      doc.transactionType as "deposit" | "withdrawal" | "transfer",
      new Money(doc.debit),
      new Money(doc.credit),
      new Money(doc.amount),
      doc.transactionDate,
      doc.details,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  async findByLedgerAccountId(
    ledgerAccountId: string,
  ): Promise<GeneralLedgerTransaction[]> {
    const docs = await GeneralLedgerTransactionModel.find({
      ledgerAccountId,
    }).exec();
    return docs.map(
      (doc) =>
        new GeneralLedgerTransaction(
          String(doc._id),
          String(doc.ledgerAccountId),
          doc.transactionType as "deposit" | "withdrawal" | "transfer",
          new Money(doc.debit),
          new Money(doc.credit),
          new Money(doc.amount),
          doc.transactionDate,
          doc.details,
          doc.createdAt,
          doc.updatedAt,
        ),
    );
  }

  async update(
    transaction: GeneralLedgerTransaction,
    session?: ClientSession,
  ): Promise<GeneralLedgerTransaction> {
    const updatedDoc = await GeneralLedgerTransactionModel.findByIdAndUpdate(
      transaction.id,
      {
        ledgerAccountId: transaction.ledgerAccountId,
        transactionType: transaction.transactionType,
        debit: transaction.debit,
        credit: transaction.credit,
        amount: transaction.amount,
        transactionDate: transaction.transactionDate,
        details: transaction.details,
      },
      { new: true, session },
    ).exec();

    if (!updatedDoc) {
      throw new Error("GeneralLedgerTransaction not found for update");
    }
    return new GeneralLedgerTransaction(
      String(updatedDoc._id),
      String(updatedDoc.ledgerAccountId),
      updatedDoc.transactionType as "deposit" | "withdrawal" | "transfer",
      new Money(updatedDoc.debit),
      new Money(updatedDoc.credit),
      new Money(updatedDoc.amount),
      updatedDoc.transactionDate,
      updatedDoc.details,
      updatedDoc.createdAt,
      updatedDoc.updatedAt,
    );
  }
}
