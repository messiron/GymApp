import { User } from "../entities/user.entity";
import { UserRepositoryPort } from "../ports/output/user-repository.port";


export class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepositoryPort) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error("User not found.");
    
    return user;
  }
}