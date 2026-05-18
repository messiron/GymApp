import { Inject } from "@nestjs/common";
import { ExerciseRepositoryPort } from "../ports/output/exercise.repository.port";
import { ExerciseNotFoundError } from "../entities/errors/Exercise-not-found.error";

export class FindByIdExerciseUseCase {
  constructor(
    @Inject(ExerciseRepositoryPort)
    private readonly exerciseRepository: ExerciseRepositoryPort
  ) {}

  async execute(id: number) {
    const exercise = await this.exerciseRepository.findById(id, true, true);
    if (!exercise) throw new ExerciseNotFoundError();

    return exercise;
  }
}