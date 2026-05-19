import { Inject } from "@nestjs/common";
import { RoutineExerciseRepositoryPort } from "../ports/output/routine-exercise.repository.port";
import { RoutineExerciseNotFoundError } from "../entities/errors/routine-exercise-not-found.error";
import { FindByIdRoutineUseCase } from "./find-by-id-routine.use-case";

export class DeleteRoutineExerciseUseCase {
  constructor(
    @Inject(RoutineExerciseRepositoryPort)
    private readonly routineExerciseRepository: RoutineExerciseRepositoryPort,
    @Inject(FindByIdRoutineUseCase)
    private readonly findByIdRoutineUseCase: FindByIdRoutineUseCase,
  ) {}

  async execute(userId: string, id: number) {
    if (isNaN(id)) throw new RoutineExerciseNotFoundError();

    const re = await this.routineExerciseRepository.findById(id);
    if (!re) throw new RoutineExerciseNotFoundError();

    await this.findByIdRoutineUseCase.execute(userId, re.data.routineId);

    await this.routineExerciseRepository.delete(id);

    return { message: "Routine exercise deleted successfully." };
  }
}