import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InvalidRefreshTokenRepositoryPort } from "../ports/output/invalid-refresh-token-repository.port";

export class GenerateTokensUseCase {
  constructor(
    @Inject(InvalidRefreshTokenRepositoryPort)
    private readonly invalidRefreshTokenRepository: InvalidRefreshTokenRepositoryPort,
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