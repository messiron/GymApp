import { Injectable } from "@nestjs/common";
import { RoutineExerciseRepositoryPort, RoutineExerciseResponse } from "../../core/ports/output/routine-exercise.repository.port";
import { PrismaService } from "src/shared/infrastructure/prisma/prisma.service";
import { RoutineExercise } from "../../core/entities/routine-exercise.entity";
import { RoutineExercise as RoutineExerciseModel } from "@prisma/client";
import { Exercise as ExerciseModel } from "@prisma/client";
import { Exercise } from "src/modules/exercise/core/entities/exercise.entity";

@Injectable()
export class PrismaRoutineExerciseRepository implements RoutineExerciseRepositoryPort {
  constructor (private readonly prisma: PrismaService) {}

  async findAll(routineId: number): Promise<RoutineExerciseResponse[]> {
    const res = await this.prisma.routineExercise.findMany({
      where: { routineId },
      include: { exercises: true },
    });

    return res.map(v => this.modelToResponse(v.exercises, v));
  }

  async findById(id: number): Promise<RoutineExerciseResponse | null> {
    const re = await this.prisma.routineExercise.findUnique({
      where: { id },
      include: { exercises: true },
    });

    if (!re) return null;

    return this.modelToResponse(re.exercises, re);
  }

  async create(routineId: number, data: RoutineExercise): Promise<void> {
    await this.prisma.routineExercise.create({
      data: {
        reps: data.reps,
        sets: data.sets,
        order: data.order,
        weight: data.weight,
        routineId,
        exerciseId: data.exerciseId,
      },
    });
  }

  async update(data: RoutineExercise): Promise<void> {
    await this.prisma.routineExercise.update({
      where: { id: data.id },
      data: {
        reps: data.reps,
        sets: data.sets,
        order: data.order,
        weight: data.weight,
      }
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.routineExercise.delete({ where: { id } });
  }

  private modelToResponse(
    exercise: ExerciseModel,
    routineExercise: RoutineExerciseModel,
  ): RoutineExerciseResponse {
    return {
      exercise: new Exercise(
        exercise.id,
        exercise.name,
        exercise.description,
        exercise.example_gif,
        exercise.timeForRep,
        exercise.createdAt,
        exercise.updatedAt
      ),
      data: {
        reps: routineExercise.reps,
        sets: routineExercise.sets,
        order: routineExercise.order,
        weight: routineExercise.weight,
      }
    }
  }
}