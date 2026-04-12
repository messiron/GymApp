import { Inject } from "@nestjs/common";
import { InvalidRefreshTokenRepositoryPort } from "../ports/output/invalid-refresh-token-repository.port";
import { JsonWebTokenError, JwtService, TokenExpiredError as JwtTokenExpiredError } from "@nestjs/jwt";
import { FindUserUseCase } from "src/modules/user/core/use-cases/find-user.use-case";
import { InvalidTokenError } from "../entities/errors/invalid-token.error";
import { InvalidRefreshToken } from "../entities/invalid-refresh-token.entity";
import { TokenExpiredError } from "../entities/errors/token-expired.error";

export class ValidateRefreshTokenUseCase {
  constructor(
    @Inject(InvalidRefreshTokenRepositoryPort)
    private readonly invalidRefreshTokenRepository: InvalidRefreshTokenRepositoryPort,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(FindUserUseCase)
    private readonly findUserUseCase: FindUserUseCase
  ) {}

  async execute(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        { secret: process.env.REFRESH_TOKEN_SECRET }
      );

      const isInvalid = await this.invalidRefreshTokenRepository.findByToken(token);
      if (isInvalid) throw new InvalidTokenError();

      await this.invalidRefreshTokenRepository.create(new InvalidRefreshToken(
        null,
        token,
        new Date(payload.exp * 1000)
      ));

      const { id, email } = await this.findUserUseCase.execute(payload.sub);
      return { id, email };
    } catch (error) {
      if (error instanceof JsonWebTokenError) throw new InvalidTokenError();
      else if (error instanceof JwtTokenExpiredError) throw new TokenExpiredError();
      
      throw error;
    }
  }
}