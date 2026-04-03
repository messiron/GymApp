import { User } from "../../entities/user.entity";

export abstract class UserRepositoryPort {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(id: string, email: string): Promise<void>;
  abstract update(user: User): Promise<void>;
  abstract delete(id: string): Promise<void>;
}