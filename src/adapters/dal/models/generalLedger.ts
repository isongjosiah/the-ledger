import {Document, model, Schema} from "mongoose";

export interface IGeneralLedgerDocument extends Document {
accountName: string,
accountType: string,
currency: string,
balance: number,
createdAt?:Date,
updatedAt?:Date
}

const GeneralLedgerSchema = new Schema<IGeneralLedgerDocument>(
  {
    accountName: { type: String, required: true },
    accountType: { type: String, required: true },
    currency: { type: String, required: true, uppercase: true, trim: true },
    balance: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
)

export const generalLedgerModel = model<IGeneralLedgerDocument>('GeneralLedger', GeneralLedgerSchema)
