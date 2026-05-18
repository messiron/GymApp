import { Inject } from "@nestjs/common";
import { MuscleGroupRepositoryPort } from "../ports/output/muscle-group.repository.port";
import { MuscleGroupNotFoundError } from "../entities/errors/muscle-group-not-found.error";

export class FindByIdMuscleGroupUseCase {
  constructor(
    @Inject(MuscleGroupRepositoryPort)
    private readonly muscleGroupRepository: MuscleGroupRepositoryPort
  ) {}

  async execute(id: number) {
    const mg = await this.muscleGroupRepository.findById(id, true);

    if (!mg) throw new MuscleGroupNotFoundError();

    return mg;
  }
}