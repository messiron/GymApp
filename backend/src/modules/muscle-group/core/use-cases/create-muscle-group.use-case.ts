import { Inject } from "@nestjs/common";
import { MuscleGroupRepositoryPort } from "../ports/output/muscle-group.repository.port";
import { MuscleGroup } from "../entities/muscle-group.entity";

export class CreateMuscleGroupUseCase {
  constructor(
    @Inject(MuscleGroupRepositoryPort)
    private readonly muscleGroupRepository: MuscleGroupRepositoryPort
  ) {}

  async execute(name: string, imageUrl: string | null) {
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