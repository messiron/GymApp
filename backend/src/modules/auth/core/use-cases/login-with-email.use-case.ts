import { Inject } from "@nestjs/common";
import { UserNotFoundError } from "src/modules/user/core/entities/errors/user-not-found.error";
import { CreateUserUseCase } from "src/modules/user/core/use-cases/create-user.use-case";
import { FindUserByEmailUseCase } from "src/modules/user/core/use-cases/find-user-by-email.use-case";

export class LoginWithEmailUseCase {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(FindUserByEmailUseCase)
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase
  ) {}

  async execute(email: string) {
    try {
      const user = await this.findUserByEmailUseCase.execute(email);
      return user;
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return await this.createUserUseCase.execute(email);
      }
      throw error;
    }
  }
}