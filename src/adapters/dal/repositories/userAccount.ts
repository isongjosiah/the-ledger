import { ClientSession } from "mongoose";
import { UserAccount } from "../../../domain/entities/userAccount";
import { IUserAccountRepository } from "../../../domain/interfaces/userAccountRepo";
import { IUserAccountDocument, userAccountModel } from "../models/userAccount";
import { Money } from "../../../domain/types/money";

export class UserAccountRepository implements IUserAccountRepository {
  async create(
    accounts: UserAccount[],
    session?: ClientSession,
  ): Promise<UserAccount[] | null> {
    let accountDocs: Array<Record<string, any>> = [];
    for (const account of accounts) {
      accountDocs.push({
        userId: account.userId,
        accountNumber: generateAccountNumber(),
        currency: account.currency,
        availableBalance: account.availableBalance.getAmount(),
      });
    }
    const createdAcc: IUserAccountDocument[] = await userAccountModel.create(
      accountDocs,
      { session },
    );

    let account: UserAccount[] = [];
    for (const acc of createdAcc) {
      account.push(
        new UserAccount(
          acc._id,
          acc.userId,
          acc.accountNumber,
          acc.currency,
          new Money(acc.availableBalance),
          new Money(acc.pendingDeposits),
          new Money(acc.pendingWithdrawals),
          new Money(acc.pendingTransfers),
        ),
      );
    }

    return account;
  }

  async findAccountById(id: string): Promise<UserAccount | null> {
    const acc = await userAccountModel.findById(id).exec();
    if (!acc) return null;
    return new UserAccount(
      acc._id,
      acc.userId,
      acc.accountNumber,
      acc.currency,
      new Money(acc.availableBalance),
      new Money(acc.pendingDeposits),
      new Money(acc.pendingWithdrawals),
      new Money(acc.pendingTransfers),
    );
  }

  async findByUserId(userId: string): Promise<UserAccount[]> {
    const accounts = await userAccountModel.find({ userId }).exec();
    return accounts.map(
      (acc) =>
        new UserAccount(
          acc._id,
          acc.userId,
          acc.accountNumber,
          acc.currency,
          new Money(acc.availableBalance),
          new Money(acc.pendingDeposits),
          new Money(acc.pendingWithdrawals),
          new Money(acc.pendingTransfers),
        ),
    );
  }

  async findByUserIdAndCurrency(
    userId: string,
    currency: string,
  ): Promise<UserAccount | null> {
    const acc = await userAccountModel
      .findOne({ userId, currency: currency.toUpperCase() })
      .exec();
    if (!acc) return null;
    return new UserAccount(
      acc._id,
      acc.userId,
      acc.accountNumber,
      acc.currency,
      new Money(acc.availableBalance),
      new Money(acc.pendingDeposits),
      new Money(acc.pendingWithdrawals),
      new Money(acc.pendingTransfers),
    );
  }

  async update(
    account: UserAccount,
    session?: ClientSession,
  ): Promise<UserAccount> {
    const acc = await userAccountModel
      .findByIdAndUpdate(
        account.id,
        {
          availableBalance: account.availableBalance.getAmount(),
          pendingDeposits: account.pendingDeposits.getAmount(),
          pendingWithdrawals: account.pendingWithdrawals.getAmount(),
          pendingTransfers: account.pendingTransfers.getAmount(),
          currency: account.currency,
        },
        { new: true, session },
      )
      .exec();
    if (!acc) {
      throw new Error("Account not found for update");
    }

    return new UserAccount(
      acc._id,
      acc.userId,
      acc.accountNumber,
      acc.currency,
      new Money(acc.availableBalance),
      new Money(acc.pendingDeposits),
      new Money(acc.pendingWithdrawals),
      new Money(acc.pendingTransfers),
    );
  }

  async delete(id: string): Promise<void> {
    await userAccountModel.findByIdAndDelete(id).exec();
  }
}

const generateAccountNumber = (): string => {
  const timeStamp = Date.now().toString();
  const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
  return `${timeStamp}${randomPart}`;
};
