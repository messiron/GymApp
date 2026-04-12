import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-custom";
import { ValidateRefreshTokenUseCase } from "../../core/use-cases/validate-refresh-token.use-case";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "refresh-token") {
  constructor(
    @Inject(ValidateRefreshTokenUseCase)
    private readonly validateRefreshTokensUseCase: ValidateRefreshTokenUseCase
  ) {
    super();
  }

  async validate(req: any) {
    const { token } = req.body;

    return await this.validateRefreshTokensUseCase.execute(token);
  }
}