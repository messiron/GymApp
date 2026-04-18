import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { CreateEmailCodeUseCase } from "../../core/use-cases/create-email-code.use-case";
import { EmailDto } from "../dtos/email.dto";
import { AuthGuard } from "@nestjs/passport";
import { LoginWithEmailUseCase } from "../../core/use-cases/login-with-email.use-case";
import { AuthAccessTokenGuard } from "src/shared/infrastructure/guards/auth-access-token.guard";
import { FindUserUseCase } from "src/modules/user/core/use-cases/find-user.use-case";
import { GenerateTokensUseCase } from "../../core/use-cases/generate-tokens.use-case";
import { ApiBearerAuth, ApiTags, ApiBody } from "@nestjs/swagger";

@ApiTags("auth")
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
  @ApiBody({
    schema: {
      type: "object",
      required: ["email", "code"],
      properties: {
        email: {
          type: "string",
          example: "test@test.com"
        },
        code: {
          type: "string",
          example: "123456"
        }
      }
    }
  })
  @UseGuards(AuthGuard("email-code"))
  async loginWithEmail(@Req() req) {
    const email: string = req.user;
    //console.log(email, typeof email)
    return await this.loginWithEmailUseCase.execute(email);
  }

  @Post("refresh")
  @ApiBody({
    schema: {
      type: "object",
      required: ["token"],
      properties: {
        token: {
          type: "string",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
        },
      }
    }
  })
  @UseGuards(AuthGuard("refresh-token"))
  async refreshToken(@Req() req) {
    const data = req.user;
    return await this.generateTokensUseCase.execute(data.id, data.email, data.role);
  }

  @Get("profile")
  @ApiBearerAuth()
  @UseGuards(AuthAccessTokenGuard)
  async getProfile(@Req() req) {
    return await this.findUserUseCase.execute(req.user.sub);
  }

  @Post("logout")
  @ApiBody({
    schema: {
      type: "object",
      required: ["token"],
      properties: {
        token: {
          type: "string",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
        },
      }
    }
  })
  @UseGuards(AuthGuard("refresh-token"))
  logout() {
    return { message: "Logout successfully" }
  }
}