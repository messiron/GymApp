import { Body, Controller, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserRole } from "src/modules/user/core/enums/user-data.enum";
import { Role } from "src/shared/infrastructure/decorators/roles.decorator";
import { AuthAccessTokenGuard } from "src/shared/infrastructure/guards/auth-access-token.guard";
import { RoleGuard } from "src/shared/infrastructure/guards/role.guard";
import { CreateRoutineExerciseUseCase } from "../../core/use-cases/create-routine-exercise.use-case";
import { CreateRoutineExerciseDto } from "../dtos/create-routine-exercise.dto";

@ApiTags("routines")
@ApiBearerAuth()
@Controller("api/routine-exercise")
@UseGuards(AuthAccessTokenGuard, RoleGuard)
@Role(UserRole.USER)
export class RoutineExerciseController {
  constructor(
    @Inject(CreateRoutineExerciseUseCase)
    private readonly createRoutineExerciseUseCase: CreateRoutineExerciseUseCase,
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
}