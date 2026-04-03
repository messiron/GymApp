import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './core/use-cases/create-user.use-case';
import { FindUserUseCase } from './core/use-cases/find-user.use-case';
import { FindUserByEmailUseCase } from './core/use-cases/find-user-by-email.use-case';
import { UserRepositoryPort } from './core/ports/output/user-repository.port';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';

@Module({
  imports: [],
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
  ]
})
export class UserModule {}
