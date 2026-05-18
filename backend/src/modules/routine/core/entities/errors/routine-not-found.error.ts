import { DomainError } from "src/shared/core/errors/domain.error";

export class RoutineNotFoundError extends DomainError {
  constructor() {
    super("Routine not found.", "ROUTINE_NOT_FOUND");
  }
}