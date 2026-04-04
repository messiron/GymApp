import { Module } from "@nestjs/common";
import { AuthController } from "./infrastructure/controllers/auth.controller";
import { CreateEmailCodeUseCase } from "./core/use-cases/create-email-code.use-case";
import { PrismaModule } from "src/shared/infrastructure/prisma/prisma.module";
import { EmailCodeRepositoryPort } from "./core/ports/output/email-code-repository.port";
import { PrismaEmailCodeRepository } from "./infrastructure/repositories/prisma-email-code.repository";
import { EmailCodeStrategy } from "./infrastructure/strategies/email-code.strategy";
import { ValidateEmailCodeUseCase } from "./core/use-cases/validate-email-code-use-case";
import { CreateUserUseCase } from "../user/core/use-cases/create-user.use-case";
import { FindUserByEmailUseCase } from "../user/core/use-cases/find-user-by-email.use-case";
import { UserModule } from "../user/user.module";
import { LoginWithEmailUseCase } from "./core/use-cases/login-with-email.use-case";

@Module({
  imports: [
    PrismaModule,
    UserModule
  ],
  controllers: [AuthController],
  providers: [
    CreateEmailCodeUseCase,
    ValidateEmailCodeUseCase,
    EmailCodeStrategy,
    LoginWithEmailUseCase,
    CreateUserUseCase,
    FindUserByEmailUseCase,
    {
      provide: EmailCodeRepositoryPort,
      useClass: PrismaEmailCodeRepository
    }
  ],
})
export class AuthModule {}