import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export class GenerateTokensUseCase {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService
  ) {}

  async execute(userId: string, email: string) {
    const payload = { sub: userId, email };

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: "7d",
    });

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: "15m",
    });

    return {
      refreshToken,
      accessToken
    }
  }
}