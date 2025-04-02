import { RedisClientType } from "@redis/client";
import { ITokenRepository } from "../../../domain/interfaces/tokenRepo";
import { createClient } from "redis";
import { Token } from "../../../domain/types/token";

export class RedisTokenRepository implements ITokenRepository {
  private client: RedisClientType;
  constructor() {
    this.client = createClient({
      url: "", //TODO: use config here
    });
    this.client.on("error", (err) =>
      console.log(`[Redis]: error with handling redis action: ${err}`),
    );
    this.client
      .connect()
      .catch((err) => console.error(`[Redis]: connection failed: ${err}`)); //TODO: just crash the app if this doesn't conect
  }

  async setAccessToken(
    key: string,
    token: Token,
    expirationInSec = 3600,
  ): Promise<void> {
    await this.client.set(
      key,
      JSON.stringify(token.accessTokenJson(expirationInSec)),
      { EX: expirationInSec },
    );
  }

  async getAccessToken(key: string): Promise<Token | null> {
    const token = await this.client.get(key);
    if (!token) {
      return null;
    }

    const data = JSON.parse(token);
    const tokenDetail = new Token(
      data.userId,
      data.userName,
      data.accessToken,
      data.refreshToken,
    );
    return tokenDetail;
  }

  async deleteAccessToken(key: string): Promise<void> {
    await this.client.del(key);
  }

  async setRefreshToken(
    key: string,
    token: Token,
    expirationInSec = 3600,
  ): Promise<void> {
    await this.client.set(
      key,
      JSON.stringify(token.accessTokenJson(expirationInSec)),
      { EX: expirationInSec },
    );
  }

  async getRefreshToken(key: string): Promise<Token | null> {
    const token = await this.client.get(key);
    if (!token) {
      return null;
    }

    const data = JSON.parse(token);
    const tokenDetail = new Token(data.userId, data.userName);
    return tokenDetail;
  }

  async deleteRefreshToken(key: string): Promise<void> {
    await this.client.del(key);
  }
}
