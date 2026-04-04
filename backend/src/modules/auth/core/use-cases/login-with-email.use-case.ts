import { Inject } from "@nestjs/common";
import { UserNotFoundError } from "src/modules/user/core/entities/errors/user-not-found.error";
import { CreateUserUseCase } from "src/modules/user/core/use-cases/create-user.use-case";
import { FindUserByEmailUseCase } from "src/modules/user/core/use-cases/find-user-by-email.use-case";
import { EmailCodeRepositoryPort } from "../ports/output/email-code-repository.port";

export class LoginWithEmailUseCase {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(FindUserByEmailUseCase)
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    @Inject(EmailCodeRepositoryPort)
    private readonly emailCodeRepository: EmailCodeRepositoryPort 
  ) {}

  async execute(email: string) {
    try {
      const user = await this.findUserByEmailUseCase.execute(email);
      await this.emailCodeRepository.deleteByEmail(email);
      return user;
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        await this.emailCodeRepository.deleteByEmail(email);
        return await this.createUserUseCase.execute(email);
      }
      throw error;
    }
  }
}