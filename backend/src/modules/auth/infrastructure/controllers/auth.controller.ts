import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { CreateEmailCodeUseCase } from "../../core/use-cases/create-email-code.use-case";
import { EmailDto } from "../dtos/email.dto";
import { AuthGuard } from "@nestjs/passport";
import { LoginWithEmailUseCase } from "../../core/use-cases/login-with-email.use-case";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { FindUserUseCase } from "src/modules/user/core/use-cases/find-user.use-case";
import { GenerateTokensUseCase } from "../../core/use-cases/generate-tokens.use-case";

@Controller("api/auth")
export class AuthController {
  constructor (
    private readonly createEmailCodeUseCase: CreateEmailCodeUseCase,
    private readonly loginWithEmailUseCase: LoginWithEmailUseCase,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly generateTokensUseCase: GenerateTokensUseCase
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

  @Post("refresh")
  @UseGuards(AuthGuard("refresh-token"))
  async refreshToken(@Req() req) {
    const data = req.user;
    return await this.generateTokensUseCase.execute(data.id, data.email);
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req) {
    return await this.findUserUseCase.execute(req.user.sub);
  }

  @Post("logout")
  @UseGuards(AuthGuard("refresh-token"))
  logout() {
    return { message: "Logout successfully" }
  }
}