import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { fileTypeFromBuffer } from "file-type";
import { InvalidFileTypeError } from "src/shared/core/errors/invalid-file-type.error";
import { VeryLargeFileError } from "src/shared/core/errors/very-large-file.error";

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  async transform(file: Express.Multer.File) {
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // max 2MB
      throw new VeryLargeFileError();
    }

    const type = await fileTypeFromBuffer(file.buffer);

    if (!type) throw new InvalidFileTypeError();

    const allowMimeTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
      "image/gif",
    ];

    if (!allowMimeTypes.includes(type.mime)) {
      throw new InvalidFileTypeError();
    }

    return file;
  }
}