import { DomainError } from "./domain.error";

export class NotAuthorizedError extends DomainError {
  constructor() {
    super("Not authorized.", "NOT_AUTHORIZED");
  }
}