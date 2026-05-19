import { Exercise } from "src/modules/exercise/core/entities/exercise.entity";
import { RoutineExercise } from "../../entities/routine-exercise.entity";
import { Routine } from "../../entities/routine.entity"

export abstract class RoutineRepositoryPort {
  abstract findAll(userId: string): Promise<Routine[]>;
  abstract findById(userId: string, routineId: number): Promise<Routine | null>;
  abstract findByTitle(userId: string, title: string): Promise<Routine[]>;
  abstract create(routine: Routine): Promise<void>;
  abstract update(routine: Routine): Promise<void>;
  abstract delete(userId: string, id: number): Promise<void>;
}