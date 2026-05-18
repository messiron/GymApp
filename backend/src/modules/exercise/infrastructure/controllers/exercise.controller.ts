import { Body, Controller, Delete, FileTypeValidator, Get, Inject, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthAccessTokenGuard } from "src/shared/infrastructure/guards/auth-access-token.guard";
import { CreateExercisesUseCase } from "../../core/use-cases/create-exercise.use-case";
import { Role } from "src/shared/infrastructure/decorators/roles.decorator";
import { UserRole } from "src/modules/user/core/enums/user-data.enum";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { createExerciseDto } from "../dtos/create-exercise.dto";
import { FindAllExerciseUseCase } from "../../core/use-cases/find-all-exercise.use-case";
import { FindByIdExerciseUseCase } from "../../core/use-cases/find-by-id-exercise.use-case";
import { FindByNameExerciseUseCase } from "../../core/use-cases/find-by-name-exercise.use-case";
import { UpdateExerciseDto } from "../dtos/update-exercise.dto";
import { UpdateExerciseUseCase } from "../../core/use-cases/update-exercise.use-case";
import { RoleGuard } from "src/shared/infrastructure/guards/role.guard";
import { DeleteExerciseUseCase } from "../../core/use-cases/delete-exercise.use-case";
import { ImageValidationPipe } from "src/shared/infrastructure/pipes/image-validation.pipe";

@ApiTags("exercise")
@ApiBearerAuth()
@Controller("api/exercise")
@UseGuards(AuthAccessTokenGuard)
export class ExerciseController {
  constructor(
    @Inject(CreateExercisesUseCase)
    private readonly createExerciseUseCase: CreateExercisesUseCase,
    @Inject(FindAllExerciseUseCase)
    private readonly findAllExerciseUseCase: FindAllExerciseUseCase,
    @Inject(FindByIdExerciseUseCase)
    private readonly findByIdExerciseUseCase: FindByIdExerciseUseCase,
    @Inject(FindByNameExerciseUseCase)
    private readonly findByNameExerciseUseCase: FindByNameExerciseUseCase,
    @Inject(UpdateExerciseUseCase)
    private readonly updateExerciseUseCase: UpdateExerciseUseCase,
    @Inject(DeleteExerciseUseCase)
    private readonly deleteExerciseUseCase: DeleteExerciseUseCase,
  ) {}

  @Get()
  async getAll() {
    return await this.findAllExerciseUseCase.execute();
  }

  @Get(":id")
  async findById(@Param("id") id: number) {
    return await this.findByIdExerciseUseCase.execute(id);
  }

  @Get("find-by-name/:name")
  async findByName(@Param("name") name: string) {
    return await this.findByNameExerciseUseCase.execute(name);
  }

  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @Post()
  @UseInterceptors(
    FileInterceptor("img", {
      storage: memoryStorage(),
    })
  )
  async create(
    @Body() createExerciseDto: createExerciseDto,
    @UploadedFile(ImageValidationPipe) img: Express.Multer.File,
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

  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @Patch(":id")
  @UseInterceptors(
    FileInterceptor("img", {
      storage: memoryStorage(),
    })
  )
  async update(
    @Param("id") id: number,
    @Body() updateExerciseDto: UpdateExerciseDto,
    @UploadedFile(ImageValidationPipe) img: Express.Multer.File,
  ) {
    return this.updateExerciseUseCase.execute({
      id,
      name: updateExerciseDto.name,
      description: updateExerciseDto.description,
      img,
      timeForRep: updateExerciseDto.timeForRep,
      muscleGroups: updateExerciseDto.relatedMuscleGroups,
    });
  }

  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @Delete(":id")
  async delete(@Param("id") id: number) {
    return await this.deleteExerciseUseCase.execute(id);
  }
}