import { IsInt, IsNumber, IsOptional } from "class-validator";

export class CreateRoutineExerciseDto {
  @IsInt()
  reps: number;

  @IsInt()
  sets: number;

  @IsInt()
  order: number;

  @IsNumber()
  @IsOptional()
  weight: number | null = null;

  @IsInt()
  exerciseId: number;

  @IsInt()
  routineId: number;
}