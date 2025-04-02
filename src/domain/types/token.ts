export class Token {
  private readonly userId: string;
  private readonly userName: string;
  private readonly accessToken: string;
  private readonly refreshToken: string;

  constructor(
    userId: string,
    userName: string,
    accessToken?: string,
    refreshToken?: string,
  ) {
    this.userId = userId;
    this.userName = userName;
    this.accessToken =
      accessToken || "acs_" + Math.random().toString(36).substr(2, 15);
    this.refreshToken =
      refreshToken || "ref_" + Math.random().toString(36).substr(2, 15);
  }

  public accessTokenJson(expirationSec: number) {
    return {
      userId: this.userId,
      userName: this.userName,
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      expiresAt: new Date(Date.now() + expirationSec * 1000).toISOString(),
    };
  }

  public refreshTokenJson(expirationSec: number) {
    return {
      userId: this.userId,
      userName: this.userName,
      expiresAt: new Date(Date.now() + expirationSec * 1000).toISOString(),
    };
  }
}
