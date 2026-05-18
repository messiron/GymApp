import { IsNumber, IsOptional } from "class-validator";

export class CreateRoutineExerciseDto {
  @IsNumber()
  reps: number;

  @IsNumber()
  sets: number;

  @IsNumber()
  order: number;

  @IsNumber()
  @IsOptional()
  weight: number | null = null;

  @IsNumber()
  exerciseId: number;
}