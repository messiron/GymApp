import { Inject } from "@nestjs/common";
import { MuscleGroupRepositoryPort } from "../ports/output/muscle-group.repository.port";
import { MuscleGroupNotFoundError } from "../entities/errors/muscle-group-not-found.error";
import { MuscleGroup } from "../entities/muscle-group.entity";

export class UpdateMuscleGroupUseCase {
  constructor(
    @Inject(MuscleGroupRepositoryPort)
    private readonly muscleGroupRepository: MuscleGroupRepositoryPort
  ) {}

  async execute(id: number, name: string, imageUrl: string) {
    const mg = await this.muscleGroupRepository.findById(id);
    if (!mg) throw new MuscleGroupNotFoundError();

    const newData = new MuscleGroup(
      id,
      name,
      imageUrl,
      mg.createdAt,
      new Date()
    );
    await this.muscleGroupRepository.update(newData);

    return newData;
  }
}