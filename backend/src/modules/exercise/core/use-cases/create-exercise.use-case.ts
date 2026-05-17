import { Inject } from "@nestjs/common";
import { ExerciseRepositoryPort } from "../ports/output/exercise.repository.port";
import { FileStorage } from "src/shared/core/ports/file-storage.port";
import { Exercise } from "../entities/exercise.entity";
import { FindByIdMuscleGroupUseCase } from "src/modules/muscle-group/core/use-cases/find-by-id-muscle-group.use-case";

export class CreateExercisesUseCase {
  constructor(
    @Inject(ExerciseRepositoryPort)
    private readonly exerciseRepository: ExerciseRepositoryPort,
    @Inject(FileStorage)
    private readonly fileStorage: FileStorage,
    @Inject(FindByIdMuscleGroupUseCase)
    private readonly findByIdMuscleGroupUseCase: FindByIdMuscleGroupUseCase
  ) {}

  async execute(data: {
    name: string,
    description: string | null,
    img: Express.Multer.File,
    timeForRep: number,
    relatedMuscleGroups: number[]
  }) {
    // check if relatedMuscleGroups exist
    for (const id of data.relatedMuscleGroups) {
      await this.findByIdMuscleGroupUseCase.execute(id);
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