import { Inject } from "@nestjs/common";
import { MuscleGroupRepositoryPort } from "../ports/output/muscle-group.repository.port";
import { MuscleGroupNotFoundError } from "../entities/errors/muscle-group-not-found.error";
import { MuscleGroup } from "../entities/muscle-group.entity";
import { FileStorage } from "src/shared/core/ports/file-storage.port";

export class UpdateMuscleGroupUseCase {
  constructor(
    @Inject(MuscleGroupRepositoryPort)
    private readonly muscleGroupRepository: MuscleGroupRepositoryPort,
    @Inject(FileStorage)
    private readonly fileStorage: FileStorage,
  ) {}

  async execute(id: number, name: string, img: Express.Multer.File) {
    const mg = await this.muscleGroupRepository.findById(id);
    if (!mg) throw new MuscleGroupNotFoundError();
    let newImage = mg.imageUrl;

    if (img) {
      newImage = await this.fileStorage.upload(img.buffer);

      if (mg.imageUrl) {
        const imageId = mg.imageUrl.split(" ")[1];
        await this.fileStorage.delete(imageId);
      } 
    }

    const newData = new MuscleGroup(
      id,
      name,
      newImage,
      mg.createdAt,
      new Date()
    );
    await this.muscleGroupRepository.update(newData);

    return newData;
  }
}