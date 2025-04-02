import { ClientSession } from 'mongoose';
import { GeneralLedgerTransaction } from '../entities/generalLedgerTransaction';

export interface IGeneralLedgerTransactionRepository {
  create(transaction: GeneralLedgerTransaction, session?: ClientSession): Promise<GeneralLedgerTransaction>;
  findById(id: string): Promise<GeneralLedgerTransaction | null>;
  findByLedgerAccountId(ledgerAccountId: string): Promise<GeneralLedgerTransaction[]>;
  update(transaction: GeneralLedgerTransaction, session?: ClientSession): Promise<GeneralLedgerTransaction>;
}
