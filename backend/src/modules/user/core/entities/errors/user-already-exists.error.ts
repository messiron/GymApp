import { DomainError } from "src/shared/core/errors/domain.error";

export class UserAlreadyExistsError extends DomainError {
  constructor() {
    super("User already exists.", "USER_ALREADY_EXISTS");
  }
}