import { DomainError } from "src/shared/core/errors/domain.error";

export class InvalidTokenError extends DomainError {
  constructor() {
    super("Invalid token.", "INVALID_TOKEN");
  }
}