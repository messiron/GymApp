import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './core/use-cases/create-user.use-case';
import { FindUserUseCase } from './core/use-cases/find-user.use-case';
import { FindUserByEmailUseCase } from './core/use-cases/find-user-by-email.use-case';
import { UserRepositoryPort } from './core/ports/output/user-repository.port';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { PrismaModule } from 'src/shared/infrastructure/prisma/prisma.module';
import { UpdateLastLoginUseCase } from './core/use-cases/update-last-login.use-case';
import { UpdateUserDataUseCase } from './core/use-cases/update-user-data.use-case';
import { UserController } from './infrastructure/controller/user.controller';

@Module({
  imports: [PrismaModule],
  providers: [
    CreateUserUseCase,
    FindUserUseCase,
    FindUserByEmailUseCase,
    UpdateLastLoginUseCase,
    UpdateUserDataUseCase,
    {
      provide: UserRepositoryPort,
      useClass: PrismaUserRepository
    }
  ],
  controllers: [UserController],
  exports: [
    CreateUserUseCase,
    FindUserUseCase,
    FindUserByEmailUseCase,
    UserRepositoryPort,
    UpdateLastLoginUseCase,
  ]
})
export class UserModule {}
