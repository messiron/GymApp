import { Inject } from "@nestjs/common";
import { RoutineExerciseRepositoryPort } from "../ports/output/routine-exercise.repository.port";
import { FindByIdRoutineUseCase } from "./find-by-id-routine.use-case";
import { RoutineExerciseNotFoundError } from "../entities/errors/routine-exercise-not-found.error";
import { RoutineExercise } from "../entities/routine-exercise.entity";

export class UpdateRoutineExerciseUseCase {
  constructor(
    @Inject(RoutineExerciseRepositoryPort)
    private readonly routineExerciseRepository: RoutineExerciseRepositoryPort,
    @Inject(FindByIdRoutineUseCase)
    private readonly findByIdRoutineUseCase: FindByIdRoutineUseCase,
  ) {}

  async execute(
    userId: string,
    id: number,
    data: {
      reps: number,
      sets: number,
      order: number,
      weight: number | null,
      routineId: number,
    }
  ) {
    await this.findByIdRoutineUseCase.execute(userId, data.routineId);
    if (isNaN(id)) throw new RoutineExerciseNotFoundError();

    const re = await this.routineExerciseRepository.findById(id);
    if (!re) throw new RoutineExerciseNotFoundError();

    const newData = new RoutineExercise(
      id,
      0,
      data.routineId,
      data.reps,
      data.sets,
      data.order,
      data.weight
    );

    await this.routineExerciseRepository.update(newData);

    return { message: "Routine exercise updated successfully." };
  }
}