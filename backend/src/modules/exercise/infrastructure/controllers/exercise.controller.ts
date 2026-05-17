import { Body, Controller, FileTypeValidator, Inject, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthAccessTokenGuard } from "src/shared/infrastructure/guards/auth-access-token.guard";
import { CreateExercisesUseCase } from "../../core/use-cases/create-exercise.use-case";
import { Role } from "src/shared/infrastructure/decorators/roles.decorator";
import { UserRole } from "src/modules/user/core/enums/user-data.enum";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { createExerciseDto } from "../dtos/create-exercise.dto";

@ApiTags("exercise")
@ApiBearerAuth()
@Controller("api/exercise")
@UseGuards(AuthAccessTokenGuard)
export class ExerciseController {
  constructor(
    @Inject(CreateExercisesUseCase)
    private readonly createExerciseUseCase: CreateExercisesUseCase,
  ) {}

  @UseGuards()
  @Role(UserRole.ADMIN)
  @Post()
  @UseInterceptors(
    FileInterceptor("img", {
      storage: memoryStorage(),
    })
  )
  async create(
    @Body() createExerciseDto: createExerciseDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    await this.createExerciseUseCase.execute({
      name: createExerciseDto.name,
      description: createExerciseDto.description,
      img,
      timeForRep: createExerciseDto.timeForRep,
      relatedMuscleGroups: createExerciseDto.relatedMuscleGroups,
    });

    return { message: "Exercise created successfully." };
  }
}