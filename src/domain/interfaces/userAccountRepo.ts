import { ClientSession} from "mongoose";
import { UserAccount } from "../entities/userAccount";

export interface IUserAccountRepository {
  create(account: UserAccount[], session?: ClientSession): Promise<UserAccount[] | null>
  findAccountById(id: string): Promise<UserAccount|null>
  findByUserId(userId: string): Promise<UserAccount[]|null>
  findByUserIdAndCurrency(userId:string, currency: string): Promise<UserAccount | null>
  update(account: UserAccount, session?:ClientSession): Promise<UserAccount>
  delete(id: string): Promise<void>
}
