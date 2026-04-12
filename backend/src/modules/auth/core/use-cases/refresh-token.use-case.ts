import { Inject } from "@nestjs/common";
import { GenerateTokensUseCase } from "./generate-tokens.use-case";
import { InvalidRefreshTokenRepositoryPort } from "../ports/output/invalid-refresh-token-repository.port";
import { JsonWebTokenError, JwtService, TokenExpiredError as JwtExpiredError } from "@nestjs/jwt";
import { FindUserUseCase } from "src/modules/user/core/use-cases/find-user.use-case";
import { InvalidRefreshToken } from "../entities/invalid-refresh-token.entity";
import { InvalidTokenError } from "../entities/errors/invalid-token.error";
import { TokenExpiredError } from "../entities/errors/token-expired.error";

export class RefreshTokenUseCase {
  constructor(
    @Inject(GenerateTokensUseCase)
    private readonly generateTokesUseCase: GenerateTokensUseCase,
    @Inject(InvalidRefreshTokenRepositoryPort)
    private readonly invalidRefreshTokenRepository: InvalidRefreshTokenRepositoryPort,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(FindUserUseCase)
    private readonly findUserUseCase: FindUserUseCase
  ) {}

  async execute(token: string) {
    try {
      const payload =await this.jwtService.verifyAsync(
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

      const user = await this.findUserUseCase.execute(payload.sub);
      const tokens = this.generateTokesUseCase.execute(user.id, user.email);

      return tokens;
    } catch (error) {
      if (error instanceof JsonWebTokenError) throw new InvalidTokenError();
      else if (error instanceof JwtExpiredError) throw new TokenExpiredError();

      throw error;
    }
  }
}