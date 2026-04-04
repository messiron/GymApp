export abstract class RefreshTokenRepositoryPort {
  abstract create(id: string, userId: string, token: string): Promise<void>;
}