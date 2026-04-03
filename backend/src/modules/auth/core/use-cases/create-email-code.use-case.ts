import { Inject, Injectable } from "@nestjs/common";
import { EmailCode } from "../entities/email-code.entity";
import { EmailCodeRepositoryPort } from "../ports/output/email-code-repository.port";

// @Injectable()
export class CreateEmailCodeUseCase {
  constructor(
    @Inject(EmailCodeRepositoryPort)
    private readonly emailCodeRepository: EmailCodeRepositoryPort
  ) {}

  async execute(email: string) {
    const existsEmailCode = await this.emailCodeRepository.findByEmail(email);
    if (existsEmailCode) await this.emailCodeRepository.delete(existsEmailCode.id);

    const code = String(EmailCode.generateCode());
    const newEmailCode = new EmailCode(
      crypto.randomUUID(),
      email,
      code,
      2, // minutes
      new Date()
    );

    console.log("➡️  Code to login:", code);
    await this.emailCodeRepository.create(newEmailCode);
    return newEmailCode;
  }
}