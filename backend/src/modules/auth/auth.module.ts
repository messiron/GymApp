import { Module } from "@nestjs/common";
import { AuthController } from "./infrastructure/controllers/auth.controller";
import { CreateEmailCodeUseCase } from "./core/use-cases/create-email-code.use-case";
import { PrismaModule } from "src/shared/infrastructure/prisma/prisma.module";
import { EmailCodeRepositoryPort } from "./core/ports/output/email-code-repository.port";
import { PrismaEmailCodeRepository } from "./infrastructure/repositories/prisma-email-code.repository";
import { EmailCodeStrategy } from "./infrastructure/strategies/email-code.strategy";
import { ValidateEmailCodeUseCase } from "./core/use-cases/validate-email-code-use-case";
import { UserModule } from "../user/user.module";
import { LoginWithEmailUseCase } from "./core/use-cases/login-with-email.use-case";
import { InvalidRefreshTokenRepositoryPort } from "./core/ports/output/invalid-refresh-token-repository.port";
import { PrismaInvalidRefreshTokenRepository } from "./infrastructure/repositories/prisma-invalid-refresh-token.repository";
import { GenerateTokensUseCase } from "./core/use-cases/generate-tokens.use-case";
import { JwtModule } from "@nestjs/jwt";
import { RefreshTokenStrategy } from "./infrastructure/strategies/refresh-token.strategy";
import { ValidateRefreshTokenUseCase } from "./core/use-cases/validate-refresh-token.use-case";

@Module({
  imports: [
    PrismaModule,
    UserModule,
    JwtModule.register({
      secret: process.env.REFRESH_TOKEN_SECRET,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    CreateEmailCodeUseCase,
    ValidateEmailCodeUseCase,
    EmailCodeStrategy,
    LoginWithEmailUseCase,
    GenerateTokensUseCase,
    RefreshTokenStrategy,
    ValidateRefreshTokenUseCase,
    {
      provide: EmailCodeRepositoryPort,
      useClass: PrismaEmailCodeRepository
    },
    {
      provide: InvalidRefreshTokenRepositoryPort,
      useClass: PrismaInvalidRefreshTokenRepository
    },
  ],
})
export class AuthModule {}