import  mongoose, { Schema, model, Document } from "mongoose";

export interface ITransactionDocument extends Document {
  accountId: mongoose.Types.ObjectId
  transactionType: string
  amount: number
  currency: string
  status: string
  details: Record<string,any>
  createdAt: Date
  updatedAt: Date
}

const TransactionSchema: Schema = new Schema<ITransactionDocument>(
  {
    accountId: {type: Schema.Types.ObjectId, required: true, ref: "Account"},
    transactionType: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, uppercase: true, trim: true },
    status: { type: String, required: true },
    details: { type: Schema.Types.Mixed, default: {} },
  },
  {timestamps: true}
)

export const TransactionModel = model<ITransactionDocument>('Transaction', TransactionSchema)
