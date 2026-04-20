export class MuscleGroup {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly imageUrl: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null,
  ) {}
}