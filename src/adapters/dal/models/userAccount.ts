import { Schema,Document, model } from "mongoose";

export interface IUserAccountDocument extends Document {
  userId: string;
  accountNumber: string;
  currency: string,
  availableBalance: number,
  pendingDeposits: number,
  pendingWithdrawals: number,
  pendingTransfers: number,
  createdAt: Date;
  updatedAt: Date
}

const UserAccountSchema = new Schema<IUserAccountDocument>(
  {
    userId: {type: String, required: true, ref: 'User'},
    accountNumber: {type: String, required: true},
    currency: {type: String, required: true, uppercase: true, trim: true},
    availableBalance: {type: Number, required: true, default: 0},
    pendingWithdrawals: {type:Number, required: true, default: 0},
    pendingTransfers: {type: Number, required: true, default: 0}
  },
  {timestamps: true}
)


export const userAccountModel = model<IUserAccountDocument>('UserAccount', UserAccountSchema)
