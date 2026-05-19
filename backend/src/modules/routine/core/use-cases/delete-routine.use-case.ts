import { Inject } from "@nestjs/common";
import { RoutineRepositoryPort } from "../ports/output/routine.repository.port";
import { RoutineNotFoundError } from "../entities/errors/routine-not-found.error";

export class DeleteRoutineUseCase {
  constructor(
    @Inject(RoutineRepositoryPort)
    private readonly routineRepository: RoutineRepositoryPort,
  ) {}

  async execute(userId: string, id: number) {
    const routine = await this.routineRepository.findById(userId, id);
    if (!routine) throw new RoutineNotFoundError();

    await this.routineRepository.delete(userId, id);

    return { message: "Routine deleted successfully." };
  }
}