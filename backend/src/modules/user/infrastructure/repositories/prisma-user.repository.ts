import { PrismaService } from "src/shared/infrastructure/prisma/prisma.service";
import { User } from "../../core/entities/user.entity";
import { UserRepositoryPort } from "../../core/ports/output/user-repository.port";
import { UserInterest, UserRole } from "generated/prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.isProfileCompleted,
      user.firstName,
      user.lastName,
      user.role,
      user.ageGroup,
      user.gender,
      user.interests,
      user.level,
      user.lastLoginAt,
      user.createdAt,
      user.updatedAt
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.isProfileCompleted,
      user.firstName,
      user.lastName,
      user.role,
      user.ageGroup,
      user.gender,
      user.interests,
      user.level,
      user.lastLoginAt,
      user.createdAt,
      user.updatedAt
    );
  }

  async create(id: string, email: string): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: id,
        email: email,
        role: UserRole.USER,
      }
    });
  }

  async update(user: User): Promise<void> {
    const transformInterest: UserInterest[] | undefined = user.interests?.map(v => UserInterest[v]);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        ageGroup: user.ageGroup,
        gender: user.gender,
        interests: transformInterest,
        level: user.level
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async updateLogin(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        lastLoginAt: new Date()
      }
    });
  }
}