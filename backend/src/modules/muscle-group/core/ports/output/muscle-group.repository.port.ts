import { MuscleGroup } from "../../entities/muscle-group.entity";

export abstract class MuscleGroupRepositoryPort {
  abstract findAll(): Promise<MuscleGroup[]>;
  abstract findById(id: number): Promise<MuscleGroup | null>;
  abstract findByName(name: string): Promise<MuscleGroup[]>;
  abstract create(muscleGroup: MuscleGroup): Promise<void>;
  abstract update(muscleGroup: MuscleGroup): Promise<void>;
  abstract delete(id: number): Promise<void>;
}