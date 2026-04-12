import { Inject } from "@nestjs/common";
import { UserNotFoundError } from "src/modules/user/core/entities/errors/user-not-found.error";
import { CreateUserUseCase } from "src/modules/user/core/use-cases/create-user.use-case";
import { FindUserByEmailUseCase } from "src/modules/user/core/use-cases/find-user-by-email.use-case";
import { EmailCodeRepositoryPort } from "../ports/output/email-code-repository.port";
import { GenerateTokensUseCase } from "./generate-tokens.use-case";

export class LoginWithEmailUseCase {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(FindUserByEmailUseCase)
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    @Inject(EmailCodeRepositoryPort)
    private readonly emailCodeRepository: EmailCodeRepositoryPort,
    @Inject(GenerateTokensUseCase)
    private readonly generateTokensUseCase: GenerateTokensUseCase
  ) {}

  async execute(email: string) {
    try {
      const user = await this.findUserByEmailUseCase.execute(email);
      await this.emailCodeRepository.deleteByEmail(email);
      const tokens = await this.generateTokensUseCase.execute(user.id, user.email);
      return {
        tokens,
        data: user,
      }
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        await this.emailCodeRepository.deleteByEmail(email);
        const newUser = await this.createUserUseCase.execute(email);
        const tokens = await this.generateTokensUseCase.execute(newUser.id, newUser.email);
        return {
          tokens,
          data: newUser,
        }
      }
      throw error;
    }
  }
}