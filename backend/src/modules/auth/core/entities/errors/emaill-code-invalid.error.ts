import { DomainError } from "src/shared/core/errors/domain.error";

export class EmailCodeInvalidError extends DomainError {
  constructor() {
    super("email or code invalid.", "INVALID_CODE");
  }
}