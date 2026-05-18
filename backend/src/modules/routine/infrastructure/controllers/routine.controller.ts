import { Body, Controller, Get, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthAccessTokenGuard } from "src/shared/infrastructure/guards/auth-access-token.guard";
import { CreateRoutineUseCase } from "../../core/use-cases/create-routine.use-case";
import { CreateRoutineDto } from "../dtos/create-routine.dto";
import { RoleGuard } from "src/shared/infrastructure/guards/role.guard";
import { Role } from "src/shared/infrastructure/decorators/roles.decorator";
import { UserRole } from "src/modules/user/core/enums/user-data.enum";

@ApiTags("routines")
@ApiBearerAuth()
@Controller("api/routine")
@UseGuards(AuthAccessTokenGuard, RoleGuard)
@Role(UserRole.USER)
export class RoutineController {
  constructor(
    @Inject(CreateRoutineUseCase)
    private readonly createRoutineUseCase: CreateRoutineUseCase,
  ) {}
  @Post()
  async create(@Body() data: CreateRoutineDto, @Req() req: any) {
    return await this.createRoutineUseCase.execute({
      title: data.title,
      description: data.description,
      userId: req.user.sub,
      routineExercises: data.routineExercises
    });
  }
}