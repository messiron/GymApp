import { Inject } from "@nestjs/common";
import { RoutineRepositoryPort } from "../ports/output/routine.repository.port";
import { RoutineNotFoundError } from "../entities/errors/routine-not-found.error";
import { Routine } from "../entities/routine.entity";

export class UpdateRoutineUseCase {
  constructor(
    @Inject(RoutineRepositoryPort)
    private readonly routineRepository: RoutineRepositoryPort,
  ) {}

  async execute(
    id: number,
    data: {
    title: string,
    description: string | null,
    userId: string,
  }
  ) {
    if (isNaN(id)) throw new RoutineNotFoundError();
    const routine = await this.routineRepository.findById(data.userId, id);
    if (!routine) throw new RoutineNotFoundError();
  

    const routineNewData = new Routine(
      routine.id,
      data.title,
      data.description,
      data.userId,
      new Date(),
      new Date(),
    );

    await this.routineRepository.update(routineNewData);

    return { message: "Routine updated successfully." };
  }
}