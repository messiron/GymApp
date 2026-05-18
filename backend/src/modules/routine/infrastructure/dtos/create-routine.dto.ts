import { IsArray, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateRoutineExerciseDto } from "./create-routine-exercise.dto";

export class CreateRoutineDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @IsOptional()
  description: string | null = null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoutineExerciseDto)
  routineExercises: CreateRoutineExerciseDto[] = [];
}