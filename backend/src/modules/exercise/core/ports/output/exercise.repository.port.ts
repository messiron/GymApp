import { MuscleGroup } from "src/modules/muscle-group/core/entities/muscle-group.entity";
import { Exercise } from "../../entities/exercise.entity";

export abstract class ExerciseRepositoryPort {
  abstract findAll(): Promise<Exercise[]>;
  abstract findById(id: number): Promise<Exercise | null>;
  abstract findByName(name: string): Promise<Exercise[]>;
  abstract getRelatedMuscles(id: number): Promise<MuscleGroup[]>
  abstract create(data: Exercise, muscleGroups: number[]): Promise<void>;
  abstract update(data: Exercise, connMg: number[], discMg: number[]): Promise<void>;
  abstract delete(id: number): Promise<void>;
}