import { DomainError } from "src/shared/core/errors/domain.error";

export class UserNotFoundError extends DomainError {
  constructor() {
    super("User not found.", "USER_NOT_FOUND");
  }
}