import { Inject } from "@nestjs/common";
import { User } from "src/modules/user/core/entities/user.entity";
import { CreateUserUseCase } from "src/modules/user/core/use-cases/create-user.use-case";
import { FindUserByEmailUseCase } from "src/modules/user/core/use-cases/find-user-by-email.use-case";

export class LoginWithEmailUseCase {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(FindUserByEmailUseCase)
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase
  ) {}

  async execute(email: string): Promise<User> {
    try {
      const user = await this.findUserByEmailUseCase.execute(email);
      return user;
    } catch (e) {
      return await this.createUserUseCase.execute(email);
    }
  }
}