export class EmailCode {
  constructor (
    public readonly id: string,
    public readonly email: string,
    public readonly code: string,
    public readonly expiresAt: number, // Time in minutes
    public readonly createdAt: Date
  ) {}

  hasExpired(): boolean {
    const currentTime = new Date();
    const diferences = (currentTime.getTime() - this.createdAt.getTime()) / (1000 * 60);

    if (diferences > this.expiresAt) return true;
    return false;
  }

  static generateCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }
}