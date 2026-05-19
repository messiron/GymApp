import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserRole } from "src/modules/user/core/enums/user-data.enum";
import { Role } from "src/shared/infrastructure/decorators/roles.decorator";
import { AuthAccessTokenGuard } from "src/shared/infrastructure/guards/auth-access-token.guard";
import { RoleGuard } from "src/shared/infrastructure/guards/role.guard";
import { CreateRoutineExerciseUseCase } from "../../core/use-cases/create-routine-exercise.use-case";
import { CreateRoutineExerciseDto } from "../dtos/create-routine-exercise.dto";
import { FindAllRoutineExercisesUseCase } from "../../core/use-cases/find-all-routine-exercises.use-case";
import { UpdateRoutineExerciseUseCase } from "../../core/use-cases/update-routine-exercise.use-case";
import { UpdateRoutineExerciseDto } from "../dtos/update-routine-exercise.dto";
import { DeleteRoutineExerciseUseCase } from "../../core/use-cases/delete-routine-exercise.use-case";

@ApiTags("routine exercises")
@ApiBearerAuth()
@Controller("api/routine-exercise")
@UseGuards(AuthAccessTokenGuard, RoleGuard)
@Role(UserRole.USER)
export class RoutineExerciseController {
  constructor(
    @Inject(CreateRoutineExerciseUseCase)
    private readonly createRoutineExerciseUseCase: CreateRoutineExerciseUseCase,
    @Inject(FindAllRoutineExercisesUseCase)
    private readonly findAllRoutineExercisesUseCase: FindAllRoutineExercisesUseCase,
    @Inject(UpdateRoutineExerciseUseCase)
    private readonly updateRoutineExerciseUseCase: UpdateRoutineExerciseUseCase,
    @Inject(DeleteRoutineExerciseUseCase)
    private readonly deleteRoutineExerciseUseCase: DeleteRoutineExerciseUseCase,
  ) {}

  @Post()
  async create(
    @Body() createRoutineExerciseDto: CreateRoutineExerciseDto,
    @Req() req: any,
  ) {
    return await this.createRoutineExerciseUseCase.execute(
      req.user.sub,
      createRoutineExerciseDto.routineId,
      {
        reps: createRoutineExerciseDto.reps,
        sets: createRoutineExerciseDto.sets,
        order: createRoutineExerciseDto.order,
        weight: createRoutineExerciseDto.weight,
        exerciseId: createRoutineExerciseDto.exerciseId,
      },
    );
  }

  @Get(":routineId")
  async findAll(@Param("routineId") routineId: number, @Req() req: any) {
    return await this.findAllRoutineExercisesUseCase.execute(req.user.sub, routineId);
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateRoutineExerciseDto: UpdateRoutineExerciseDto,
    @Req() req: any,
  ) {
    return await this.updateRoutineExerciseUseCase.execute(
      req.user.sub,
      id,
      {
        reps: updateRoutineExerciseDto.reps,
        sets: updateRoutineExerciseDto.sets,
        order: updateRoutineExerciseDto.order,
        weight: updateRoutineExerciseDto.weight,
        routineId: updateRoutineExerciseDto.routineId,
      }
    );
  }

  @Delete(":id")
  async delete(@Param("id") id: number, @Req() req: any) {
    return await this.deleteRoutineExerciseUseCase.execute(req.user.sub, id);
  }
}