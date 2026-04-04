import { UserRole } from "generated/prisma/enums";
import { User } from "../entities/user.entity";
import { UserRepositoryPort } from "../ports/output/user-repository.port";
import { Inject } from "@nestjs/common";
import { UserAlreadyExistsError } from "../entities/errors/user-already-exists.error";
import { UserInvalidEmailError } from "../entities/errors/user-invalid-email.error";

export class CreateUserUseCase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort
  ) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!User.validEmail(email)) throw new UserInvalidEmailError();
    if (user) throw new UserAlreadyExistsError();

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