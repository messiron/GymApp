import { DomainError } from "./domain.error";

export class InvalidFileTypeError extends DomainError {
  constructor() {
    super("The file type is invalid.", "INVALID_FILE_TYPE");
  }
}