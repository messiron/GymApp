export abstract class FileStorage {
  abstract upload(file: Buffer, folder?: string): Promise<string>;
  abstract delete(publicId: string): Promise<void>;
} 