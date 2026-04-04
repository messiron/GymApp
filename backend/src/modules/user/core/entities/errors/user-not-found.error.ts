import { UserDomainError } from "../user-domain.error";

export class UserNotFoundError extends UserDomainError {
  constructor() {
    super("User not found.");
  }
}