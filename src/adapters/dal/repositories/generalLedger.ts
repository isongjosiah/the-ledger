import { ClientSession } from 'mongoose';
import { GeneralLedger } from '../../../domain/entities/generalLedgerAccount';
import { generalLedgerModel, IGeneralLedgerDocument } from '../models/generalLedger';
import { IGeneralLedgerAccountRepository } from '../../../domain/interfaces/generalLedger';
import { Money } from '../../../domain/types/money';

export class GeneralLedgerAccountRepository implements IGeneralLedgerAccountRepository{
  async create(account: GeneralLedger, session?: ClientSession): Promise<GeneralLedger> {
    const createdDocs: IGeneralLedgerDocument[] = await generalLedgerModel.create(
      [{
        accountName: account.accountName,
        accountType: account.accountType,
        currency: account.currency,
        balance: account.balance.getAmount()
      }],
      { session }
    );
    const created = createdDocs[0];
    return new GeneralLedger(
      String(created._id),
      created.accountName,
      created.accountType as any,
      created.currency,
      new Money(created.balance),
      created.createdAt,
      created.updatedAt
    );
  }

  async findById(id: string): Promise<GeneralLedger| null> {
    const doc = await generalLedgerModel.findById(id).exec();
    if (!doc) return null;
    return new GeneralLedger(
      String(doc._id),
      doc.accountName,
      doc.accountType as any,
      doc.currency,
      new Money(doc.balance),
      doc.createdAt,
      doc.updatedAt
    );
  }

  async findByCurrency(currency: string): Promise<GeneralLedger[]> {
    const docs = await generalLedgerModel.find({ currency: currency.toUpperCase() }).exec();
    return docs.map(doc => new GeneralLedger(
      String(doc._id),
      doc.accountName,
      doc.accountType as any,
      doc.currency,
      new Money(doc.balance),
      doc.createdAt,
      doc.updatedAt
    ));
  }

  async update(account: GeneralLedger, session?: ClientSession): Promise<GeneralLedger> {
    const updatedDoc = await generalLedgerModel.findByIdAndUpdate(
      account.id,
      {
        accountName: account.accountName,
        accountType: account.accountType,
        currency: account.currency,
        balance: account.balance,
      },
      { new: true, session }
    ).exec();

    if (!updatedDoc) {
      throw new Error('GeneralLedgerAccount not found for update');
    }
    return new GeneralLedger(
      String(updatedDoc._id),
      updatedDoc.accountName,
      updatedDoc.accountType as any,
      updatedDoc.currency,
      new Money(updatedDoc.balance),
      updatedDoc.createdAt,
      updatedDoc.updatedAt
    );
  }
}

