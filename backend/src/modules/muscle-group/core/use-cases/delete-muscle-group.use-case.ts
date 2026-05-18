import { Inject } from "@nestjs/common";
import { MuscleGroupRepositoryPort } from "../ports/output/muscle-group.repository.port";
import { MuscleGroupNotFoundError } from "../entities/errors/muscle-group-not-found.error";
import { FileStorage } from "src/shared/core/ports/file-storage.port";

export class DeleteMuscleGroupUseCase {
  constructor(
    @Inject(MuscleGroupRepositoryPort)
    private readonly muscleGroupRepository: MuscleGroupRepositoryPort,
    @Inject(FileStorage)
    private readonly fileStorage: FileStorage,
  ) {}

  async execute(id: number) {
    const mg = await this.muscleGroupRepository.findById(id, false);
    if (!mg) {throw new MuscleGroupNotFoundError()};
    
    if (mg.imageUrl) {
      const imageId = mg.imageUrl.split(" ")[1];
      await this.fileStorage.delete(imageId);
    }

    await this.muscleGroupRepository.delete(id);
  }
}