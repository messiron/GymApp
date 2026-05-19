import { Inject } from "@nestjs/common";
import { RoutineExerciseRepositoryPort } from "../ports/output/routine-exercise.repository.port";
import { FindByIdRoutineUseCase } from "./find-by-id-routine.use-case";

export class FindAllRoutineExercisesUseCase {
  constructor(
    @Inject(RoutineExerciseRepositoryPort)
    private readonly routineExerciseRepository: RoutineExerciseRepositoryPort,
    @Inject(FindByIdRoutineUseCase)
    private readonly findByIdRoutineUseCase: FindByIdRoutineUseCase,
  ) {}

  async execute(userId: string, routineId: number) {
    await this.findByIdRoutineUseCase.execute(userId, routineId);

    return await this.routineExerciseRepository.findAll(routineId);
  }
}