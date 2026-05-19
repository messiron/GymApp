import { Injectable } from "@nestjs/common";
import { RoutineExerciseResponse, RoutineRepositoryPort } from "../../core/ports/output/routine.repository.port";
import { PrismaService } from "src/shared/infrastructure/prisma/prisma.service";
import { Routine } from "../../core/entities/routine.entity";
import { Routine as RoutineModel } from "@prisma/client";
import { RoutineExercise as RoutineExerciseModel } from "@prisma/client";
import { RoutineExercise } from "../../core/entities/routine-exercise.entity";
import { Exercise } from "src/modules/exercise/core/entities/exercise.entity";
import { Exercise as ExerciseModel } from "@prisma/client";

@Injectable()
export class PrismaRoutineRepository implements RoutineRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string): Promise<Routine[]> {
    const routines = await this.prisma.routine.findMany({ where: { userId } });

    return routines.map(r => this.modelToRoutine(r));
  }

  async findById(userId: string, routineId: number): Promise<Routine | null> {
    const routine = await this.prisma.routine.findUnique({
      where: {
        id: routineId,
        AND: { userId },
      }
    });

    if (!routine) return null;
    return this.modelToRoutine(routine);
  }

  async findByTitle(userId: string, title: string): Promise<Routine[]> {
    const routines = await this.prisma.routine.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
        AND: {
          userId,
        },
      },
    });

    return routines.map(r => this.modelToRoutine(r));
  }

  async getExercises(userId: string, id: number): Promise<RoutineExerciseResponse[]> {
    const routineExercise = await this.prisma.routineExercise.findMany({
      where: {
        routineId: id,
        AND: {
          routines: {
            userId
          },
        },
      },
      include: {
        exercises: true,
      },
    });

    return routineExercise.map(v => {
      const { exercises, ...routineExercise } = v;
      
      return this.modelToResponse(exercises, routineExercise);
    });
  }

  async create(routine: Routine): Promise<void> {
    await this.prisma.routine.create({
      data: {
        title: routine.title,
        description: routine.description,
        userId: routine.userId,
        createdAt: routine.createdAt,
      }
    });
  }

  async update(routine: Routine): Promise<void> {
    await this.prisma.routine.update({
      where: { id: routine.id },
      data: {
        title: routine.title,
        description: routine.description,
      },
    });
  }

  async delete(userId: string, id: number): Promise<void> {
    await this.prisma.routine.delete({
      where: {
        id,
        AND: {
          userId
        }
      }
    });
  }

  private modelToRoutine(model: RoutineModel): Routine {
    return new Routine(
      model.id,
      model.title,
      model.description,
      model.userId,
      model.createdAt,
      model.updatedAt,
    );
  }

  private modelToResponse(
    exercise: ExerciseModel,
    routineExercise: RoutineExerciseModel
  ): RoutineExerciseResponse {
    return {
      exercise: new Exercise(
        exercise.id,
        exercise.name,
        exercise.description,
        exercise.example_gif,
        exercise.timeForRep,
        exercise.createdAt,
        exercise.updatedAt,
      ),
      data: new RoutineExercise(
        routineExercise.id,
        routineExercise.exerciseId,
        routineExercise.reps,
        routineExercise.sets,
        routineExercise.order,
        routineExercise.weight,
      ),
    }
  }
}