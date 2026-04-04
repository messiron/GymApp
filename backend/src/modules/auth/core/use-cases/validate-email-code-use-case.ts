import { Inject } from "@nestjs/common";
import { EmailCodeRepositoryPort } from "../ports/output/email-code-repository.port";

export class ValidateEmailCodeUseCase {
  constructor(
    @Inject(EmailCodeRepositoryPort)
    private readonly emailcodeRepository: EmailCodeRepositoryPort
  ) {}

  async execute(email: string, code: string): Promise<boolean> {
    const codeEmail = await this.emailcodeRepository.findByEmail(email);

    if (!codeEmail) return false;
    if (codeEmail.code !== code || codeEmail.hasExpired()) return false;

    return true;
  }
}