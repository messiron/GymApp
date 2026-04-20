import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/infrastructure/prisma/prisma.module';
import { MuscleGroupRepositoryPort } from './core/ports/output/muscle-group.repository.port';
import { PrismaMuscleGroupRepository } from './infrastructure/repositories/prisma-muscle-group.repository';
import { CreateMuscleGroupUseCase } from './core/use-cases/create-muscle-group.use-case';
import { FindAllMuscleGroupsUseCase } from './core/use-cases/find-all-muscle-groups.use-case';
import { MuscleGroupController } from './infrastructure/controllers/muscle-group.controller';
import { FindByNameMuscleGroupUseCase } from './core/use-cases/find-by-name-muscle-group.use-case';
import { UpdateMuscleGroupUseCase } from './core/use-cases/update-muscle-group.use-case';
import { DeleteMuscleGroupUseCase } from './core/use-cases/delete-muscle-group.use-case';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: "15m" },
    }),
  ],
  providers: [
    CreateMuscleGroupUseCase,
    FindAllMuscleGroupsUseCase,
    FindByNameMuscleGroupUseCase,
    UpdateMuscleGroupUseCase,
    DeleteMuscleGroupUseCase,
    {
      provide: MuscleGroupRepositoryPort,
      useClass: PrismaMuscleGroupRepository,
    },
  ],
  controllers: [MuscleGroupController],
})
export class MuscleGroupModule {}
