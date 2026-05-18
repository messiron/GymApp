import { DomainError } from "./domain.error";

export class VeryLargeFileError extends DomainError {
  constructor() {
    super("Very large file.", "LARGE_FILE");
  }
}