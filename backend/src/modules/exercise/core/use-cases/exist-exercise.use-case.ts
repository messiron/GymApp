import { Inject } from "@nestjs/common";
import { ExerciseRepositoryPort } from "../ports/output/exercise.repository.port";
import { ExerciseNotFoundError } from "../entities/errors/Exercise-not-found.error";

export class ExistExerciseUseCase {
  constructor(
    @Inject(ExerciseRepositoryPort)
    private readonly exerciseRepository: ExerciseRepositoryPort,
  ) {}

  async execute(id: number) {
    const exercise = await this.exerciseRepository.findById(id, false, false);

    if (!exercise) throw new ExerciseNotFoundError();
  }
}