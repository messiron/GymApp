import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { RoutineRepositoryPort } from "./core/ports/output/routine.repository.port";
import { PrismaRoutineRepository } from "./infrastructure/repositories/prisma-routine.repository";
import { ExerciseModule } from "../exercise/exercise.module";
import { CreateRoutineUseCase } from "./core/use-cases/create-routine.use-case";
import { RoutineController } from "./infrastructure/controllers/routine.controller";
import { FindAllRoutinesUseCase } from "./core/use-cases/find-all-routines.use-case";
import { FindByIdRoutineUseCase } from "./core/use-cases/find-by-id-routine.use-case";
import { FindByTitleRoutineUseCase } from "./core/use-cases/find-by-title-routine.use-case";
import { GetRoutineExercisesUseCase } from "./core/use-cases/get-routine-exercises.use-case";
import { UpdateRoutineUseCase } from "./core/use-cases/update-routine.use-case";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: {  expiresIn: "15m" },
    }),
    ExerciseModule,
  ],
  providers: [
    CreateRoutineUseCase,
    FindAllRoutinesUseCase,
    FindByIdRoutineUseCase,
    FindByTitleRoutineUseCase,
    GetRoutineExercisesUseCase,
    UpdateRoutineUseCase,
    {
      provide: RoutineRepositoryPort,
      useClass: PrismaRoutineRepository,
    }
  ],
  controllers: [RoutineController],
})
export class RoutineModule {}