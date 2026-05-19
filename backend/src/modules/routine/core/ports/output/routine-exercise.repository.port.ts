import { Exercise } from "src/modules/exercise/core/entities/exercise.entity";
import { RoutineExercise } from "../../entities/routine-exercise.entity";

export type RoutineExerciseResponse = {
  exercise: Exercise,
  data: RoutineExercise,
}

export abstract class RoutineExerciseRepositoryPort {
  abstract findAll(routineId: number): Promise<RoutineExerciseResponse[]>;
  abstract findById(id: number): Promise<RoutineExerciseResponse | null>;
  abstract create(routineId: number, data: RoutineExercise): Promise<void>;
  abstract update(data: RoutineExercise): Promise<void>;
  abstract delete(id: number): Promise<void>;
}