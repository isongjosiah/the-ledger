import { Token } from "../types/token";

export interface ITokenRepository {
  setAccessToken(
    key: string,
    token: Token,
    expirationInSec?: number,
  ): Promise<void>;
  getAccessToken(key: string): Promise<Token | null>;
  deleteAccessToken(key: string): Promise<void>;

  setRefreshToken(
    key: string,
    token: Token,
    expirationInSec?: number,
  ): Promise<void>;
  getRefreshToken(key: string): Promise<Token | null>;
  deleteRefreshToken(key: string): Promise<void>;
}
