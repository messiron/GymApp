import { Inject } from "@nestjs/common";
import { RoutineRepositoryPort } from "../ports/output/routine.repository.port";
import { RoutineNotFoundError } from "../entities/errors/routine-not-found.error";

export class GetRoutineExercisesUseCase {
  constructor(
    @Inject(RoutineRepositoryPort)
    private readonly routineRepository: RoutineRepositoryPort
  ) {}

  async execute(userId: string, id: number) {
    if (isNaN(id)) throw new RoutineNotFoundError();
    
    const routine = await this.routineRepository.findById(userId, id);
    if (!routine) throw new RoutineNotFoundError();

    return await this.routineRepository.getExercises(userId, id);
  }
}