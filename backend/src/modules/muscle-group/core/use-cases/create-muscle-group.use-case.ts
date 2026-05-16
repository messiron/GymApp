import { Inject } from "@nestjs/common";
import { MuscleGroupRepositoryPort } from "../ports/output/muscle-group.repository.port";
import { MuscleGroup } from "../entities/muscle-group.entity";
import { FileStorage } from "src/shared/core/ports/file-storage.port";

export class CreateMuscleGroupUseCase {
  constructor(
    @Inject(MuscleGroupRepositoryPort)
    private readonly muscleGroupRepository: MuscleGroupRepositoryPort,
    @Inject(FileStorage)
    private readonly fileStorage: FileStorage
  ) {}

  async execute(name: string, img: Express.Multer.File) {
    let imageUrl: string | null = null;
    if (img) imageUrl = await this.fileStorage.upload(img.buffer, "muscle-groups");

    const newMuscleGroup = new MuscleGroup(
      1,
      name,
      imageUrl,
      new Date(),
      null
    );

    await this.muscleGroupRepository.create(newMuscleGroup);
  }
}