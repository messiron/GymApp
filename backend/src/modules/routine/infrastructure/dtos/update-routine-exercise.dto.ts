import { IsInt, IsNumber, IsOptional } from "class-validator";

export class UpdateRoutineExerciseDto {
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
  routineId: number;
}