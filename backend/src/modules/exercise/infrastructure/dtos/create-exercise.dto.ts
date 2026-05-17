import { Transform, Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class createExerciseDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  description: string | null = null;

  @IsOptional()
  img?: any = null;

  @Type(() => Number)
  @IsNumber()
  timeForRep: number;

  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  relatedMuscleGroups: number[] = [];
}