import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from 'src/shared/infrastructure/cloudinary/cloudinary.module';
import { ExerciseRepositoryPort } from './core/ports/output/exercise.repository.port';
import { PrismaExerciseRepository } from './infrastructure/repositories/prisma-exercise.repository';
import { CreateExercisesUseCase } from './core/use-cases/create-exercise.use-case';
import { ExerciseController } from './infrastructure/controllers/exercise.controller';
import { MuscleGroupModule } from '../muscle-group/muscle-group.module';
import { FindAllExerciseUseCase } from './core/use-cases/find-all-exercise.use-case';
import { FindByIdExerciseUseCase } from './core/use-cases/find-by-id-exercise.use-case';
import { FindByNameExerciseUseCase } from './core/use-cases/find-by-name-exercise.use-case';
import { UpdateExerciseUseCase } from './core/use-cases/update-exercise.use-case';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: {  expiresIn: "15m" },
    }),
    CloudinaryModule,
    MuscleGroupModule,
  ],
  providers: [
    CreateExercisesUseCase,
    FindAllExerciseUseCase,
    FindByIdExerciseUseCase,
    FindByNameExerciseUseCase,
    UpdateExerciseUseCase,
    {
      provide: ExerciseRepositoryPort,
      useClass: PrismaExerciseRepository,
    },
  ],
  controllers: [ExerciseController],
})
export class ExerciseModule {}
