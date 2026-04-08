import { InvalidRefreshToken } from "../../entities/invalid-refresh-token.entity";

export abstract class InvalidRefreshTokenRepositoryPort {
  abstract create(invalidRefreshToken: InvalidRefreshToken): Promise<void>;
  abstract findByToken(token: string): Promise<InvalidRefreshToken | null>;
  abstract delete(id: number): Promise<void>;
}