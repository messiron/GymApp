export class Exercise {
  constructor(
    public readonly id: number,
    public readonly name: number,
    public readonly description: number,
    public readonly exampleGif: number,
    public readonly timeForRep: number,
    public readonly createdAt: number,
    public readonly updatedAt: number,
  ) {}
}