import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/infrastructure/prisma/prisma.service";
import { Routine } from "../../core/entities/routine.entity";
import { Routine as RoutineModel } from "@prisma/client";
import { RoutineRepositoryPort } from "../../core/ports/output/routine.repository.port";

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
}