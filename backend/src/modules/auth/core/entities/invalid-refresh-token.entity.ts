export class InvalidRefreshToken {
  constructor(
    public readonly id: number | null,
    public readonly token: string,
    public readonly expiresAt: Date,
  ) {}

  isExpired(): Boolean {
    const currentTime = new Date().getTime();

    if (currentTime > this.expiresAt.getTime()) return true;
    return false;
  }
}