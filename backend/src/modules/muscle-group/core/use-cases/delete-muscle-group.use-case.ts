import { Inject } from "@nestjs/common";
import { MuscleGroupRepositoryPort } from "../ports/output/muscle-group.repository.port";
import { MuscleGroupNotFoundError } from "../entities/errors/muscle-group-not-found.error";

export class DeleteMuscleGroupUseCase {
  constructor(
    @Inject(MuscleGroupRepositoryPort)
    private readonly muscleGroupRepository: MuscleGroupRepositoryPort
  ) {}

  async execute(id: number) {
    const mg = await this.muscleGroupRepository.findById(id);
    if (!mg) {throw new MuscleGroupNotFoundError()};

    await this.muscleGroupRepository.delete(id);
  }
}