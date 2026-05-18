import { Exercise } from "src/modules/exercise/core/entities/exercise.entity";
import { RoutineExercise } from "../../entities/routine-exercise.entity";
import { Routine } from "../../entities/routine.entity"

export type RoutineExerciseResponse = {
  exercise: Exercise,
  data: RoutineExercise,
}

export abstract class RoutineRepositoryPort {
  abstract findAll(userId: string): Promise<Routine[]>;
  abstract findById(userId: string, routineId: number): Promise<Routine | null>;
  abstract findByTitle(userId: string, title: string): Promise<Routine[]>;
  abstract getExercises(userId: string, id: number): Promise<RoutineExerciseResponse[]>;
  abstract create(routine: Routine, routineExercise: RoutineExercise[]): Promise<void>;
  abstract update(routine: Routine, routineExercise: RoutineExercise[]): Promise<void>;
  abstract delete(id: number): Promise<void>;
}