import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateMuscleGroupUseCase } from "../../core/use-cases/create-muscle-group.use-case";
import { FindAllMuscleGroupsUseCase } from "../../core/use-cases/find-all-muscle-groups.use-case";
import { CreateMuscleGroupDto } from "../dtos/create-muscle-group.dto";
import { FindByNameMuscleGroupUseCase } from "../../core/use-cases/find-by-name-muscle-group.use-case";
import { UpdateMuscleGroupDto } from "../dtos/upate-muscle-group.dto";
import { UpdateMuscleGroupUseCase } from "../../core/use-cases/update-muscle-group.use-case";
import { DeleteMuscleGroupUseCase } from "../../core/use-cases/delete-muscle-group.use-case";
import { AuthAccessTokenGuard } from "src/shared/infrastructure/guards/auth-access-token.guard";
import { RoleGuard } from "src/shared/infrastructure/guards/role.guard";
import { UserRole } from "src/modules/user/core/enums/user-data.enum";
import { Role } from "src/shared/infrastructure/decorators/roles.decorator";

@ApiTags("muscle group")
@ApiBearerAuth()
@Controller("api/muscle-group")
@UseGuards(AuthAccessTokenGuard)
export class MuscleGroupController {
  constructor(
    @Inject(CreateMuscleGroupUseCase)
    private readonly createMuscleGroupUseCase: CreateMuscleGroupUseCase,
    @Inject(FindAllMuscleGroupsUseCase)
    private readonly findAllMuscleGroupsUseCase: FindAllMuscleGroupsUseCase,
    @Inject(FindByNameMuscleGroupUseCase)
    private readonly findByNameMuscleGroupUseCase: FindByNameMuscleGroupUseCase,
    @Inject(UpdateMuscleGroupUseCase)
    private readonly updateMuscleGroupUseCase: UpdateMuscleGroupUseCase,
    @Inject(DeleteMuscleGroupUseCase)
    private readonly deleteMuscleGroupUseCase: DeleteMuscleGroupUseCase
  ) {}

  @Get()
  getAll() {
    return this.findAllMuscleGroupsUseCase.execute();
  }

  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @Post()
  create(@Body() createMuscleGroupDto: CreateMuscleGroupDto) {
    this.createMuscleGroupUseCase.execute(createMuscleGroupDto.name, createMuscleGroupDto.imageUrl);

    return { message: "Muscle group created." }
  }

  @Get("find-by-name/:name")
  findByName(@Param("name") name: string) {
    return this.findByNameMuscleGroupUseCase.execute(name);
  }

  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @Patch(":id")
  async update(@Param("id") id: number, @Body() updateMuscleGroupDto: UpdateMuscleGroupDto) {
    const muscleGroupUpdated = await this.updateMuscleGroupUseCase.execute(
      id,
      updateMuscleGroupDto.name,
      updateMuscleGroupDto.imageUrl
    );

    return {
      message: "Muscle group updated successfully.",
      data: muscleGroupUpdated,
    }
  }

  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @Delete(":id")
  async delete(@Param("id") id: number) {
    await this.deleteMuscleGroupUseCase.execute(id);

    return { message: "Muscle group deleted successfully." };
  }
}