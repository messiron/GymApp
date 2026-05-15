import { Module } from "@nestjs/common";
import { FileStorage } from "src/shared/core/ports/file-storage.port";
import { CloudinaryService } from "./cloudinary.service";

@Module({
  providers: [
    {
      provide: FileStorage,
      useClass: CloudinaryService,
    },
  ],
  exports: [FileStorage],
})
export class CloudinaryModule {}