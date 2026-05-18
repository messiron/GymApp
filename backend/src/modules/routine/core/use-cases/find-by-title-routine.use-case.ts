import { Inject } from "@nestjs/common";
import { RoutineRepositoryPort } from "../ports/output/routine.repository.port";

export class FindByTitleRoutineUseCase {
  constructor(
    @Inject(RoutineRepositoryPort)
    private readonly routineRepository: RoutineRepositoryPort,
  ) {}

  async execute(userId: string, title: string) {
    return await this.routineRepository.findByTitle(userId, title);
  }
}