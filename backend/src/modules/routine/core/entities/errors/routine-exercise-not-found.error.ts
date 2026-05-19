import { DomainError } from "src/shared/core/errors/domain.error";

export class RoutineExerciseNotFoundError extends DomainError {
  constructor() {
    super("Routine exercise not found.", "ROUTINE_EXERCISE_NOT_FOUND");
  }
}