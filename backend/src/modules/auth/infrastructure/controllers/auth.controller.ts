import { Body, Controller, Post } from "@nestjs/common";
import { CreateEmailCodeUseCase } from "../../core/use-cases/create-email-code.use-case";
import { EmailDto } from "../dtos/email.dto";

@Controller("api/auth")
export class AuthController {
  constructor (
    private readonly createEmailCodeUseCase: CreateEmailCodeUseCase
  ) {}

  @Post("send-code")
  sendCodeToEmail(@Body() emailDto: EmailDto) {
    return this.createEmailCodeUseCase.execute(emailDto.email);
  }
}