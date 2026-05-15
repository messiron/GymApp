import { Injectable } from "@nestjs/common";
import { FileStorage } from "src/shared/core/ports/file-storage.port";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class CloudinaryService implements FileStorage {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async upload(file: Buffer, folder= process.env.CLOUDINARY_FOLDER): Promise<String> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder }, (error, result) => {
          if (error) return reject(error);
          resolve(`${result!.secure_url} ${result!.public_id}`);
        })
        .end(file);
    });
  }

  async delete(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}