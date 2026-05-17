import { Inject } from "@nestjs/common";
import { ExerciseRepositoryPort } from "../ports/output/exercise.repository.port";

export class FindByNameExerciseUseCase {
  constructor(
    @Inject(ExerciseRepositoryPort)
    private readonly exerciseRepository: ExerciseRepositoryPort
  ) {}

  async execute(name: string) {
    const nameFormated = name.replaceAll("-", " ");
    return this.exerciseRepository.findByName(name);
  }
}