import { Body, Controller, Patch, Req, UseGuards } from "@nestjs/common";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UpdateUserDataUseCase } from "../../core/use-cases/update-user-data.use-case";
import { AuthAccessTokenGuard } from "src/shared/infrastructure/guards/auth-access-token.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("user")
@Controller("api/user")
export class UserController {
  constructor(
    private readonly updateUserDataUseCase: UpdateUserDataUseCase
  ) {}
  
  @Patch()
  @ApiBearerAuth()
  @UseGuards(AuthAccessTokenGuard)
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserDataUseCase.execute({
      id: req.user.sub,
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      ageGroup: updateUserDto.ageGroup,
      gender: updateUserDto.gender,
      interest: updateUserDto.interest,
      level: updateUserDto.level
    });
  }
}