import { User } from "../../entities/user.entity";

export interface UserRepositoryPort {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(id: string, email: string): Promise<void>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}