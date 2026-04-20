import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateMuscleGroupDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  imageUrl: string;
}