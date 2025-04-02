import { ClientSession } from "mongoose";
import { GeneralLedger } from "../entities/generalLedgerAccount";

export interface IGeneralLedgerAccountRepository {
  create(
    account: GeneralLedger,
    session?: ClientSession,
  ): Promise<GeneralLedger>;
  findById(id: string): Promise<GeneralLedger | null>;
  findByCurrency(currency: string): Promise<GeneralLedger[]>;
  update(
    account: GeneralLedger,
    session?: ClientSession,
  ): Promise<GeneralLedger>;
}
