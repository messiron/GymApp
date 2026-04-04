import { UserRole } from "generated/prisma/enums";
import { User } from "../entities/user.entity";
import { UserRepositoryPort } from "../ports/output/user-repository.port";
import { Inject } from "@nestjs/common";

export class CreateUserUseCase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort
  ) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (user) throw new Error("User already exists.");

    const newUser = new User(
      crypto.randomUUID(),
      email,
      false,
      null,
      null,
      UserRole.USER,
      null,
      null,
      null,
      null,
      null,
      new Date(),
      null
    );

    await this.userRepository.create(newUser.id, email);
    return newUser;
  }
}