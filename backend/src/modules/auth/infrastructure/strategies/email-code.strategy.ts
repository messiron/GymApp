import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ValidateEmailCodeUseCase } from "../../core/use-cases/validate-email-code-use-case";
import { EmailCodeInvalidError } from "../../core/entities/errors/emaill-code-invalid.error";

@Injectable()
export class EmailCodeStrategy extends PassportStrategy(Strategy, "email-code") {
  constructor(
    @Inject(ValidateEmailCodeUseCase)
    private readonly validateEmailCodeUseCase: ValidateEmailCodeUseCase
  ) {
    super({
      usernameField: "email",
      passwordField: "code"
    });
  }

  async validate(email: string, code: string): Promise<string> {
    const isValid = await this.validateEmailCodeUseCase.execute(email, code);
    if (!isValid) throw new EmailCodeInvalidError();

    return email;
  }
}