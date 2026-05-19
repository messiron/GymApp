import { Inject } from "@nestjs/common";
import { RoutineExerciseRepositoryPort } from "../ports/output/routine-exercise.repository.port";
import { ExistExerciseUseCase } from "src/modules/exercise/core/use-cases/exist-exercise.use-case";
import { RoutineExercise } from "../entities/routine-exercise.entity";
import { FindByIdRoutineUseCase } from "./find-by-id-routine.use-case";

export class CreateRoutineExerciseUseCase {
  constructor(
    @Inject(RoutineExerciseRepositoryPort)
    private readonly routineExerciseRepository: RoutineExerciseRepositoryPort,
    @Inject(ExistExerciseUseCase)
    private readonly existExerciseUseCase: ExistExerciseUseCase,
    @Inject(FindByIdRoutineUseCase)
    private readonly findByIdRoutineUseCase: FindByIdRoutineUseCase,
  ) {}

  async execute(
    userId: string,
    routineId: number,
    data: {
      reps: number,
      sets: number,
      order: number,
      weight: number | null,
      exerciseId: number,
    }
  ) {
    await this.findByIdRoutineUseCase.execute(userId, routineId);
    await this.existExerciseUseCase.execute(data.exerciseId);

    const newRoutineExercise = new RoutineExercise(
      1,
      data.exerciseId,
      data.reps,
      data.sets,
      data.order,
      data.weight,
    );

    await this.routineExerciseRepository.create(routineId, newRoutineExercise);

    return { message: "Routine exercise created successfully." };
  }
}