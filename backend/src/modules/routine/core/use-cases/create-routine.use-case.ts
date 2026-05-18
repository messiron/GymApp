import { Inject } from "@nestjs/common";
import { RoutineRepositoryPort } from "../ports/output/routine.repository.port";
import { Routine } from "../entities/routine.entity";
import { ExistExerciseUseCase } from "src/modules/exercise/core/use-cases/exist-exercise.use-case";
import { RoutineExercise } from "../entities/routine-exercise.entity";

type CreateRoutineExerciseData = {
  reps: number,
  sets: number,
  order: number,
  weight: number | null,
  exerciseId: number,
}

export class CreateRoutineUseCase {
  constructor(
    @Inject(RoutineRepositoryPort)
    private readonly routineRepository: RoutineRepositoryPort,
    @Inject(ExistExerciseUseCase)
    private readonly existExerciseUseCase: ExistExerciseUseCase,
  ) {}

  async execute(data: {
    title: string,
    description: string | null,
    userId: string,
    routineExercises: CreateRoutineExerciseData[],
  }) {
    for (const re of data.routineExercises) {
      await this.existExerciseUseCase.execute(re.exerciseId);
    }

    const routineExercises = data.routineExercises.map(e => new RoutineExercise(
      1,
      e.exerciseId,
      e.reps,
      e.sets,
      e.order,
      e.weight,
    )); 

    const newRoutine = new Routine(
      1,
      data.title,
      data.description,
      data.userId,
      new Date(),
      new Date(),
    );

    await this.routineRepository.create(newRoutine, routineExercises);
    
    return { message: "Routine created successfully" };
  }
}