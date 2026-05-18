import { RoutineExercise } from "../../entities/routine-exercise.entity";
import { Routine } from "../../entities/routine.entity"

export abstract class RoutineRepositoryPort {
  abstract findAll(): Promise<Routine[]>;
  abstract findById(id: number): Promise<Routine | null>;
  abstract findByTitle(title: string): Promise<Routine[]>;
  abstract getExercises(id: number): Promise<RoutineExercise[]>;
  abstract create(routine: Routine): Promise<void>;
  abstract update(routine: Routine, exercises: RoutineExercise[]): Promise<void>;
  abstract delete(id: number): Promise<void>;
}