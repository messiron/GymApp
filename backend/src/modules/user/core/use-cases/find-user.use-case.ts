import { User } from "../entities/user.entity";
import { UserRepositoryPort } from "../ports/output/user-repository.port";


export class FindUserUseCase {
  constructor(private userRepository: UserRepositoryPort) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new Error("User not found");

    return user;
  }
}