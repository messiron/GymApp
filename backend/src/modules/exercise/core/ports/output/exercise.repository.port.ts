import { MuscleGroup } from "src/modules/muscle-group/core/entities/muscle-group.entity";
import { Exercise } from "../../entities/exercise.entity";

export type ExerciseReponse = {
  data: Exercise,
  muscleGroups: MuscleGroup[],
}

export abstract class ExerciseRepositoryPort {
  abstract findAll(): Promise<ExerciseReponse[]>;
  abstract findById(id: number): Promise<ExerciseReponse | null>;
  abstract findByName(name: string): Promise<ExerciseReponse[]>;
  abstract create(data: Exercise, muscleGroups: number[]): Promise<void>;
  abstract update(data: Exercise, connMg: number[], discMg: number[]): Promise<void>;
  abstract delete(id: number): Promise<void>;
}