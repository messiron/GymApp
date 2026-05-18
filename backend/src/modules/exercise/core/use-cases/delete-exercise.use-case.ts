import { Inject } from "@nestjs/common";
import { ExerciseRepositoryPort } from "../ports/output/exercise.repository.port";
import { ExerciseNotFoundError } from "../entities/errors/Exercise-not-found.error";
import { FileStorage } from "src/shared/core/ports/file-storage.port";

export class DeleteExerciseUseCase {
  constructor(
    @Inject(ExerciseRepositoryPort)
    private readonly exerciseRepository: ExerciseRepositoryPort,
    @Inject(FileStorage)
    private readonly fileStorage: FileStorage,
  ) {}

  async execute(id: number) {
    const exercise = await this.exerciseRepository.findById(id, false, false);
    if (!exercise) throw new ExerciseNotFoundError();

    if (exercise.data.exampleGif) {
      const exampleGifId = exercise.data.exampleGif.split(" ")[1];

      await this.fileStorage.delete(exampleGifId);
    }

    await this.exerciseRepository.delete(exercise.data.id);

    return { message: "Exercise Deleted successfully." };
  }
}