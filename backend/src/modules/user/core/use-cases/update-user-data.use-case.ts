import { Inject } from "@nestjs/common";
import { UserRepositoryPort } from "../ports/output/user-repository.port";
import { UserNotFoundError } from "../entities/errors/user-not-found.error";
import { User } from "../entities/user.entity";
import { UserAgeGroup, UserGender, UserInterest } from "../enums/user-data.enum";
import { DifficultyLevel } from "src/shared/core/global.enum";

export class UpdateUserDataUseCase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepositoy: UserRepositoryPort
  ) {}

  async execute(
    data: {
      id: string,
      firstName: string,
      lastName: string | null,
      ageGroup: UserAgeGroup,
      gender: UserGender,
      interest: UserInterest[],
      level: DifficultyLevel,
    }
  ) {
    const user = await this.userRepositoy.findById(data.id);
    if (!user) throw new UserNotFoundError();

    const userNewData = new User(
      user.id,
      user.email,
      user.isProfileCompleted,
      data.firstName,
      data.lastName,
      user.role,
      data.ageGroup,
      data.gender,
      data.interest,
      data.level,
      user.lastLoginAt,
      user.createdAt,
      user.updatedAt
    );
    userNewData.isCompleted();
    
    await this.userRepositoy.update(userNewData);
    return {
      message: "User updated",
      user: userNewData
    };
  }
}