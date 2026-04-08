import { Injectable } from "@nestjs/common";
import { InvalidRefreshTokenRepositoryPort } from "../../core/ports/output/invalid-refresh-token-repository.port";
import { PrismaService } from "src/shared/infrastructure/prisma/prisma.service";
import { InvalidRefreshToken } from "../../core/entities/invalid-refresh-token.entity";

@Injectable()
export class PrismaInvalidRefreshTokenRepository implements InvalidRefreshTokenRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(invalidRefreshToken: InvalidRefreshToken): Promise<void> {
    await this.prisma.invalid_refresh_tokens.create({
      data: {
        token: invalidRefreshToken.token,
        expiresAt: invalidRefreshToken.expiresAt,
      }
    });
  }

  async findByToken(token: string): Promise<InvalidRefreshToken | null> {
    const invalidToken = await this.prisma.invalid_refresh_tokens.findFirst({ where: { token } });

    if (!invalidToken) return null;
    return new InvalidRefreshToken(
      invalidToken.id,
      invalidToken.token,
      invalidToken.expiresAt
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.invalid_refresh_tokens.delete({ where: { id } });
  }
}