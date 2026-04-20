import { Injectable } from "@nestjs/common";
import { MuscleGroupRepositoryPort } from "../../core/ports/output/muscle-group.repository.port";
import { PrismaService } from "src/shared/infrastructure/prisma/prisma.service";
import { MuscleGroup } from "../../core/entities/muscle-group.entity";
import { MuscleGroup as Model } from "@prisma/client";

@Injectable()
export class PrismaMuscleGroupRepository implements MuscleGroupRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<MuscleGroup[]> {
    const muscleGroups = await this.prisma.muscleGroup.findMany();
    return muscleGroups.map((mg) => this.modelToEntity(mg));
  }

  async findById(id: number): Promise<MuscleGroup | null> {
    const muscleGroup = await this.prisma.muscleGroup.findUnique({ where: { id } });

    if (!muscleGroup) return null;
    return this.modelToEntity(muscleGroup);
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

    return muscleGroups.map(mg => this.modelToEntity(mg));
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

  private modelToEntity(model: Model): MuscleGroup {
    return new MuscleGroup(
      model.id,
      model.name,
      model.image_url,
      model.createdAt,
      model.updatedAt
    );
  } 
}