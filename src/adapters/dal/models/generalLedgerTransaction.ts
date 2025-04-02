import mongoose, { Schema, Document } from "mongoose";

export interface IGeneralLedgerTransactionDocument extends Document {
  ledgerAccountId: mongoose.Types.ObjectId;
  transactionType: string;
  debit: number;
  credit: number;
  amount: number;
  transactionDate: Date;
  details: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const GeneralLedgerTransactionSchema: Schema =
  new Schema<IGeneralLedgerTransactionDocument>(
    {
      ledgerAccountId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "GeneralLedgerAccount",
      },
      transactionType: { type: String, required: true },
      debit: { type: Number, required: true },
      credit: { type: Number, required: true },
      amount: { type: Number, required: true },
      transactionDate: { type: Date, required: true },
      details: { type: Schema.Types.Mixed, default: {} },
    },
    { timestamps: true },
  );

export const GeneralLedgerTransactionModel =
  mongoose.model<IGeneralLedgerTransactionDocument>(
    "GeneralLedgerTransaction",
    GeneralLedgerTransactionSchema,
  );
