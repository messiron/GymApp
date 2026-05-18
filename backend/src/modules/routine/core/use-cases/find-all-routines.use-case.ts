import { Inject } from "@nestjs/common";
import { RoutineRepositoryPort } from "../ports/output/routine.repository.port";

export class FindAllRoutinesUseCase {
  constructor(
    @Inject(RoutineRepositoryPort)
    private readonly routineRepository: RoutineRepositoryPort,
  ) {}

  async execute(userId: string) {
    return await this.routineRepository.findAll(userId);
  }
}