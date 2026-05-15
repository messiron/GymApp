export abstract class FileStorage {
  abstract upload(file: Buffer, folder?: string): Promise<String>;
  abstract delete(publicId: string): Promise<void>;
} 