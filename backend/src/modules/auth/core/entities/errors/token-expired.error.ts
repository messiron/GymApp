import { DomainError } from "src/shared/core/errors/domain.error";

export class TokenExpiredError extends DomainError {
  constructor() {
    super("token expired.", "TOKEN_EXPIRED");
  }
}