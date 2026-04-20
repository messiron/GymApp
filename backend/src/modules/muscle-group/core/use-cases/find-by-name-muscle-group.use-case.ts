import { Inject } from "@nestjs/common";
import { MuscleGroupRepositoryPort } from "../ports/output/muscle-group.repository.port";

export class FindByNameMuscleGroupUseCase {
  constructor(
    @Inject(MuscleGroupRepositoryPort)
    private readonly muscleGroupRepository: MuscleGroupRepositoryPort
  ) {}

  execute(name: string) {
    const nameFormated = name.replaceAll("-", " ").trim();
    return this.muscleGroupRepository.findByName(nameFormated);
  }
}