import { Inject } from "@nestjs/common";
import { UserRepositoryPort } from "../ports/output/user-repository.port";
import { UserNotFoundError } from "../entities/errors/user-not-found.error";

export class UpdateLastLoginUseCase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort
  ) {}

  async execute(id: string) {
    await this.userRepository.updateLogin(id);
  }
}