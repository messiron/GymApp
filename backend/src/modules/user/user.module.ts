import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './core/use-cases/create-user.use-case';
import { FindUserUseCase } from './core/use-cases/find-user.use-case';
import { FindUserByEmailUseCase } from './core/use-cases/find-user-by-email.use-case';
import { UserRepositoryPort } from './core/ports/output/user-repository.port';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { PrismaModule } from 'src/shared/infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    CreateUserUseCase,
    FindUserUseCase,
    FindUserByEmailUseCase,
    {
      provide: UserRepositoryPort,
      useClass: PrismaUserRepository
    }
  ],
  exports: [
    CreateUserUseCase,
    FindUserUseCase,
    FindUserByEmailUseCase,
    UserRepositoryPort,
  ]
})
export class UserModule {}
