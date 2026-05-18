export class RoutineExercise {
  constructor(
    public readonly id: number,
    public readonly exerciseId: number,
    public readonly reps: number,
    public readonly sets: number,
    public readonly order: number,
    public readonly weight: number | null,
  ) {}
}