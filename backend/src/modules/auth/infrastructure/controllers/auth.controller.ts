import { BadRequestException, Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { CreateEmailCodeUseCase } from "../../core/use-cases/create-email-code.use-case";
import { EmailDto } from "../dtos/email.dto";
import { AuthGuard } from "@nestjs/passport";
import { isString } from "class-validator";
import { LoginWithEmailUseCase } from "../../core/use-cases/login-with-email.use-case";

@Controller("api/auth")
export class AuthController {
  constructor (
    private readonly createEmailCodeUseCase: CreateEmailCodeUseCase,
    private readonly loginWithEmailUseCase: LoginWithEmailUseCase
  ) {}

  @Post("send-code")
  sendCodeToEmail(@Body() emailDto: EmailDto) {
    return this.createEmailCodeUseCase.execute(emailDto.email);
  }

  @Post("login")
  @UseGuards(AuthGuard("email-code"))
  async loginWithEmail(@Req() req) {
    const email: string = req.user;
    //console.log(email, typeof email)
    return await this.loginWithEmailUseCase.execute(email);
  }
}