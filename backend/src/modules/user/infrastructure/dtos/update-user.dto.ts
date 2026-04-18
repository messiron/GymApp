import { 
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,MinLength,
  ValidateNested
} from "class-validator";

import { UserAgeGroup, UserGender, UserInterest } from "../../core/enums/user-data.enum";
import { Transform } from "class-transformer";
import { DifficultyLevel } from "src/shared/core/global.enum";

export class UpdateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  firstName: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  @IsOptional()
  lastName: string | null = null;

  @IsEnum(UserAgeGroup)
  ageGroup: UserAgeGroup;

  @IsEnum(UserGender)
  gender: UserGender;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsEnum(UserInterest, { each: true })
  interest: UserInterest[];

  @IsEnum(DifficultyLevel)
  level: DifficultyLevel;
}