import { Module } from "@nestjs/common";
import { AuthController } from "./infrastructure/controllers/auth.controller";
import { CreateEmailCodeUseCase } from "./core/use-cases/create-email-code.use-case";
import { PrismaModule } from "src/shared/infrastructure/prisma/prisma.module";
import { EmailCodeRepositoryPort } from "./core/ports/output/email-code-repository.port";
import { PrismaEmailCodeRepository } from "./infrastructure/repositories/prisma-email-code.repository";

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [
    CreateEmailCodeUseCase,
    {
      provide: EmailCodeRepositoryPort,
      useClass: PrismaEmailCodeRepository
    }
  ],
})
export class AuthModule {}