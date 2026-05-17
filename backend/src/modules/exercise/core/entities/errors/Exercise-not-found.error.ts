import { DomainError } from "src/shared/core/errors/domain.error";

export class ExerciseNotFoundError extends DomainError {
  constructor() {
    super("Exercise not found", "EXERCISE_NOT_FOUND");
  }
}