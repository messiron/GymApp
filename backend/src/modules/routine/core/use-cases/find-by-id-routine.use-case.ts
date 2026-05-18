import { Inject } from "@nestjs/common";
import { RoutineRepositoryPort } from "../ports/output/routine.repository.port";
import { RoutineNotFoundError } from "../entities/errors/routine-not-found.error";

export class FindByIdRoutineUseCase {
  constructor(
    @Inject(RoutineRepositoryPort)
    private readonly routineRepository: RoutineRepositoryPort,
  ) {}

  async execute(userId: string, routineId: number) {
    const routine = await this.routineRepository.findById(userId, routineId);
    if (!routine) throw new RoutineNotFoundError();

    return routine;
  }
}