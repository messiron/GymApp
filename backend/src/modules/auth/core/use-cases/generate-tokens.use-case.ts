import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRole } from "src/modules/user/core/enums/user-data.enum";

export class GenerateTokensUseCase {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService
  ) {}

  async execute(userId: string, email: string, role: UserRole) {
    const refreshPayload = { sub: userId, email };
    const accessPayload = { sub: userId, role };

    const refreshToken = await this.jwtService.signAsync(refreshPayload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: "7d",
    });

    const accessToken = await this.jwtService.signAsync(accessPayload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: "15m",
    });

    return {
      refreshToken,
      accessToken
    }
  }
}