import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateRoutineDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @IsOptional()
  description: string | null = null;
}