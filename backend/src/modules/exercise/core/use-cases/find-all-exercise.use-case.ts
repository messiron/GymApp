import { Inject } from "@nestjs/common";
import { ExerciseRepositoryPort } from "../ports/output/exercise.repository.port";

export class FindAllExerciseUseCase {
  constructor(
    @Inject(ExerciseRepositoryPort)
    private readonly exerciseRepository: ExerciseRepositoryPort
  ) {}

  async execute() {
    return this.exerciseRepository.findAll();
  }
}