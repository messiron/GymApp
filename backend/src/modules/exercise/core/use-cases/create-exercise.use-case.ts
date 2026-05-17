import { Inject } from "@nestjs/common";
import { ExerciseRepositoryPort } from "../ports/output/exercise.repository.port";
import { FileStorage } from "src/shared/core/ports/file-storage.port";
import { Exercise } from "../entities/exercise.entity";
import { MuscleGroupRepositoryPort } from "src/modules/muscle-group/core/ports/output/muscle-group.repository.port";

export class CreateExercisesUseCase {
  constructor(
    @Inject(ExerciseRepositoryPort)
    private readonly exerciseRepository: ExerciseRepositoryPort,
    @Inject(FileStorage)
    private readonly fileStorage: FileStorage,
    @Inject(MuscleGroupRepositoryPort)
    private readonly muscleGroupRepository: MuscleGroupRepositoryPort,
  ) {}

  async execute(data: {
    name: string,
    description: string | null,
    img: Express.Multer.File,
    timeForRep: number,
    relatedMuscleGroups: number[]
  }) {
    if (data.relatedMuscleGroups.length > 0) {
      await this.muscleGroupRepository.existingMuscleGroups(data.relatedMuscleGroups);
    }

    let gifExample: string | null = null;

    if (data.img) {
      gifExample = await this.fileStorage.upload(data.img.buffer);
    }

    const newExercise = new Exercise(
      1,
      data.name,
      data.description,
      gifExample,
      data.timeForRep,
      new Date(),
      new Date(),
    );

    await this.exerciseRepository.create(newExercise, data.relatedMuscleGroups);
  }
}