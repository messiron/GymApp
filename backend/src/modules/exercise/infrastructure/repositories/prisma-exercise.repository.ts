import { PrismaService } from "src/shared/infrastructure/prisma/prisma.service";
import { ExerciseReponse, ExerciseRepositoryPort } from "../../core/ports/output/exercise.repository.port"
import { Exercise } from "../../core/entities/exercise.entity";
import { Exercise as ExerciseModel } from "@prisma/client";
import { MuscleGroup as MuscleGroupModel } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { MuscleGroup } from "src/modules/muscle-group/core/entities/muscle-group.entity";

@Injectable()
export class PrismaExerciseRepository implements ExerciseRepositoryPort {
  constructor (private readonly prisma: PrismaService) {}

  async findAll(): Promise<ExerciseReponse[]> {
    const exercises = await this.prisma.exercise.findMany({
      include: {
        muscleGroups: true,
      }
    });

    return exercises.map(m => this.modelToResponse(m, m.muscleGroups));
  }

  async findById(id: number): Promise<ExerciseReponse | null> {
    const exercise = await this.prisma.exercise.findFirst({
      where: { id },
      include: { muscleGroups: true },
    });
    if (!exercise) return null;

    return this.modelToResponse(exercise, exercise.muscleGroups);
  }

  async findByName(name: string): Promise<ExerciseReponse[]> {
    const exercises = await this.prisma.exercise.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        }
      },
      include: { muscleGroups: true },
    });

    return exercises.map(m => this.modelToResponse(m, m.muscleGroups));
  }

  async getRelatedMuscles(id: number): Promise<MuscleGroup[]> {
    const relatedMuscles = await this.prisma.muscleGroup.findMany({
      where: {
        exercises: {
          some: {
            id,
          }
        }
      },
    });

    return relatedMuscles.map(m => new MuscleGroup(
      m.id,
      m.name,
      m.image_url,
      m.createdAt,
      m.updatedAt
    ));
  }

  async create(data: Exercise, muscleGroups: number[]): Promise<void> {
    await this.prisma.exercise.create({
      data: {
        name: data.name,
        description: data.description,
        example_gif: data.exampleGif,
        timeForRep: data.timeForRep,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        muscleGroups: {
          connect: muscleGroups.map(id => {
            return { id };
          }),
        },
      },
    });
  }

  async update(data: Exercise, connMg: number[], discMg: number[]): Promise<void> {
    await this.prisma.exercise.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        example_gif: data.exampleGif,
        timeForRep: data.timeForRep,
        muscleGroups: {
          connect: connMg.map(id => {
            return { id };
          }),
          disconnect: discMg.map(id => {
            return { id }
          }),
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.exercise.delete({ where: { id } });
  }

  private modelToResponse(model: ExerciseModel, muscleGroups: MuscleGroupModel[]): ExerciseReponse {
    return {
      data: new Exercise(
        model.id,
        model.name,
        model.description,
        model.example_gif,
        model.timeForRep,
        model.createdAt,
        model.updatedAt,
      ),
      muscleGroups: muscleGroups.map(v => new MuscleGroup(
        v.id,
        v.name,
        v.image_url,
        v.createdAt,
        v.updatedAt
      )),
    };
  }
}