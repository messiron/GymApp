import { Inject } from "@nestjs/common";
import { ExerciseRepositoryPort } from "../ports/output/exercise.repository.port";
import { ExerciseNotFoundError } from "../entities/errors/Exercise-not-found.error";
import { FileStorage } from "src/shared/core/ports/file-storage.port";
import { Exercise } from "../entities/exercise.entity";
import { MuscleGroupRepositoryPort } from "src/modules/muscle-group/core/ports/output/muscle-group.repository.port";

export class UpdateExerciseUseCase {
  constructor(
    @Inject(ExerciseRepositoryPort)
    private readonly exerciseRespository: ExerciseRepositoryPort,
    @Inject(FileStorage)
    private readonly fileStorage: FileStorage,
    @Inject(MuscleGroupRepositoryPort)
    private readonly muscleGroupRepository: MuscleGroupRepositoryPort,
  ) {}

  async execute(data: {
    id: number,
    name: string,
    description: string | null,
    img: Express.Multer.File,
    timeForRep: number,
    muscleGroups: number[],
  }) {
    const exercise = await this.exerciseRespository.findById(data.id, false, false);
    if (!exercise) throw new ExerciseNotFoundError();

    if (data.muscleGroups.length > 0) {
      await this.muscleGroupRepository.existingMuscleGroups(data.muscleGroups);
    }

    let exampleGif: string | null = null;

    if (data.img) {
      exampleGif = await this.fileStorage.upload(data.img.buffer, "exercises");

      if (exercise.data.exampleGif) {
        const gifId = exercise.data.exampleGif.split(" ")[1];
        await this.fileStorage.delete(gifId);
      }
    }

    const newData = new Exercise(
      data.id,
      data.name,
      data.description,
      exampleGif,
      data.timeForRep,
      exercise.data.createdAt,
      new Date(),
    );

    await this.exerciseRespository.update(newData, data.muscleGroups);

    return { message: "Exercise updated successfully." };
  }
}