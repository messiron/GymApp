import { Inject } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserRepositoryPort } from "../ports/output/user-repository.port";
import { UserNotFoundError } from "../entities/errors/user-not-found.error";

export class FindUserByEmailUseCase {
  constructor(
    @Inject(UserRepositoryPort)
    private userRepository: UserRepositoryPort
  ) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new UserNotFoundError();
    
    return user;
  }
}