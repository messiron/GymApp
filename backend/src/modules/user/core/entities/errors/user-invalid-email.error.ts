import { DomainError } from "src/shared/core/errors/domain.error";

export class UserInvalidEmailError extends DomainError {
  constructor() {
    super("Invalid email.", "USER_INVALID_EMAIL");
  }
}