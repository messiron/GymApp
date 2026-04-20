import { DomainError } from "src/shared/core/errors/domain.error";

export class MuscleGroupNotFoundError extends DomainError {
  constructor() {
    super("Muscle group not found", "MUSCLE_GROUP_NOT_FOUND");
  }
}