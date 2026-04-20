import { Inject } from "@nestjs/common";
import { MuscleGroupRepositoryPort } from "../ports/output/muscle-group.repository.port";

export class FindAllMuscleGroupsUseCase {
  constructor(
    @Inject(MuscleGroupRepositoryPort)
    private readonly muscleGroupRespository: MuscleGroupRepositoryPort
  ) {}

  async execute() {
    return await this.muscleGroupRespository.findAll();
  }
}