import { Exercise } from "../../entities/exercise.entity";

abstract class ExerciseRepositoryPort {
  abstract findAll(): Promise<void>;
  abstract findById(id: number): Promise<Exercise | null>;
  abstract findByName(name: string): Promise<Exercise[]>;
  abstract create(data: Exercise): Promise<void>;
  abstract update(data: Exercise): Promise<void>;
  abstract delete(id: number): Promise<void>;
}