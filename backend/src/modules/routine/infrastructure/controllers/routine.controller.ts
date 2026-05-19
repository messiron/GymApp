import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthAccessTokenGuard } from "src/shared/infrastructure/guards/auth-access-token.guard";
import { CreateRoutineUseCase } from "../../core/use-cases/create-routine.use-case";
import { CreateRoutineDto } from "../dtos/create-routine.dto";
import { RoleGuard } from "src/shared/infrastructure/guards/role.guard";
import { Role } from "src/shared/infrastructure/decorators/roles.decorator";
import { UserRole } from "src/modules/user/core/enums/user-data.enum";
import { FindAllRoutinesUseCase } from "../../core/use-cases/find-all-routines.use-case";
import { FindByIdRoutineUseCase } from "../../core/use-cases/find-by-id-routine.use-case";
import { FindByTitleRoutineUseCase } from "../../core/use-cases/find-by-title-routine.use-case";
import { UpdateRoutineUseCase } from "../../core/use-cases/update-routine.use-case";
import { UpdateRoutineDto } from "../dtos/update-routine.dto";
import { DeleteRoutineUseCase } from "../../core/use-cases/delete-routine.use-case";

@ApiTags("routines")
@ApiBearerAuth()
@Controller("api/routine")
@UseGuards(AuthAccessTokenGuard, RoleGuard)
@Role(UserRole.USER)
export class RoutineController {
  constructor(
    @Inject(CreateRoutineUseCase)
    private readonly createRoutineUseCase: CreateRoutineUseCase,
    @Inject(FindAllRoutinesUseCase)
    private readonly findAllRoutinesUseCase: CreateRoutineUseCase,
    @Inject(FindByIdRoutineUseCase)
    private readonly findByIdRoutineUseCase: FindByIdRoutineUseCase,
    @Inject(FindByTitleRoutineUseCase)
    private readonly findByTitleRoutineUseCase: FindByTitleRoutineUseCase,
    @Inject(UpdateRoutineUseCase)
    private readonly updateRoutineUseCase: UpdateRoutineUseCase,
    @Inject(DeleteRoutineUseCase)
    private readonly deleteRoutineUseCase: DeleteRoutineUseCase,
  ) {}
  @Get()
  async findAll(@Req() req: any) {
    return await this.findAllRoutinesUseCase.execute(req.user.sub);
  }

  @Get(":id")
  async findById(@Param("id") id: number, @Req() req: any) {
    return await this.findByIdRoutineUseCase.execute(req.user.sub, id);
  }

  @Get("/find-by-title/:title")
  async findByTitle(@Param("title") title: string, @Req() req: any) {
    return await this.findByTitleRoutineUseCase.execute(req.user.sub, title);    
  }

  @Post()
  async create(@Body() data: CreateRoutineDto, @Req() req: any) {
    return await this.createRoutineUseCase.execute({
      title: data.title,
      description: data.description,
      userId: req.user.sub,
    });
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateRoutineDto: UpdateRoutineDto,
    @Req() req: any,
  ) {
    return await this.updateRoutineUseCase.execute(
      id,
      {
        title: updateRoutineDto.title,
        description: updateRoutineDto.description,
        userId: req.user.sub,
      },
    );
  }

  @Delete(":id")
  async delete(@Param("id") id: number, @Req() req: any) {
    return await this.deleteRoutineUseCase.execute(req.user.sub, id);
  }
}