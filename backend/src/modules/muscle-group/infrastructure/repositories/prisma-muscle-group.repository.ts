import { Injectable } from "@nestjs/common";
import { MuscleGroupRepositoryPort } from "../../core/ports/output/muscle-group.repository.port";
import { PrismaService } from "src/shared/infrastructure/prisma/prisma.service";
import { MuscleGroup } from "../../core/entities/muscle-group.entity";
import { MuscleGroup as Model } from "@prisma/client";
import { formatImageUrlUtil } from "src/shared/core/utils/format-image-url.util";
import { MuscleGroupNotFoundError } from "../../core/entities/errors/muscle-group-not-found.error";

@Injectable()
export class PrismaMuscleGroupRepository implements MuscleGroupRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<MuscleGroup[]> {
    const muscleGroups = await this.prisma.muscleGroup.findMany();
    return muscleGroups.map((mg) => this.modelToEntity(mg, true));
  }

  async findById(id: number, format: boolean): Promise<MuscleGroup | null> {
    const muscleGroup = await this.prisma.muscleGroup.findUnique({ where: { id } });

    if (!muscleGroup) return null;
    return this.modelToEntity(muscleGroup, format);
  }

  async findByName(name: string): Promise<MuscleGroup[]> {
    const muscleGroups = await this.prisma.muscleGroup.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive"
        }
      }
    });

    return muscleGroups.map(mg => this.modelToEntity(mg, true));
  }

  async existingMuscleGroups(ids: number[]) {
    const existingMg = await this.prisma.muscleGroup.findMany({
      where: { 
        id: { in: ids },
       },
       select: { id: true },
    });

    const existingIds = existingMg.map(mg => mg.id);
    const missingIds = ids.filter(i => !existingIds.includes(i));

    if (missingIds.length > 0) throw new MuscleGroupNotFoundError();
  }

  async create(muscleGroup: MuscleGroup): Promise<void> {
    await this.prisma.muscleGroup.create({
      data: {
        name: muscleGroup.name,
        image_url: muscleGroup.imageUrl,
        createdAt: muscleGroup.createdAt,
      }
    });
  }

  async update(muscleGroup: MuscleGroup): Promise<void> {
    await this.prisma.muscleGroup.update({
      where: { id: muscleGroup.id },
      data: {
        name: muscleGroup.name,
        image_url: muscleGroup.imageUrl,
      }
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.muscleGroup.delete({ where: { id } });
  }

  private modelToEntity(model: Model, format: boolean): MuscleGroup {
    return new MuscleGroup(
      model.id,
      model.name,
      format ? formatImageUrlUtil(model.image_url) : model.image_url,
      model.createdAt,
      model.updatedAt
    );
  } 
}