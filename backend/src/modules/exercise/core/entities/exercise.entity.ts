export class Exercise {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string | null,
    public readonly exampleGif: string | null,
    public readonly timeForRep: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}