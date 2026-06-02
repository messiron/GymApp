import { Inject, Injectable } from "@nestjs/common";
import { EmailCode } from "../entities/email-code.entity";
import { EmailCodeRepositoryPort } from "../ports/output/email-code-repository.port";
import { EmailSenderPort } from "src/shared/core/ports/email-sender.port";

export class CreateEmailCodeUseCase {
  constructor(
    @Inject(EmailCodeRepositoryPort)
    private readonly emailCodeRepository: EmailCodeRepositoryPort,
    @Inject(EmailSenderPort)
    private readonly emailSender: EmailSenderPort,
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

    // use email service
    /*await this.emailSender.send({
      to: email,
      subject: "Verification code",
      html: `
        <h1>Your code</h1>
        <p>${code}</p>
        <p>This code expires in 2 minutes.</p>
      `,
    });*/
    console.log(code);
    await this.emailCodeRepository.create(newEmailCode);
    return {
      message: "Code sent to email.",
      email,
    };
  }
}