import { Body, Controller, Param, Patch } from "@nestjs/common";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UpdateUserDataUseCase } from "../../core/use-cases/update-user-data.use-case";

@Controller("api/user")
export class UserController {
  constructor(
    private readonly updateUserDataUseCase: UpdateUserDataUseCase
  ) {}
  
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserDataUseCase.execute({
      id,
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      ageGroup: updateUserDto.ageGroup,
      gender: updateUserDto.gender,
      interest: updateUserDto.interest,
      level: updateUserDto.level
    });
  }
}