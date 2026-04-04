import { UserDomainError } from "../user-domain.error";

export class UserAlreadyExistsError extends UserDomainError {
  constructor() {
    super("User already exists.");
  }
}