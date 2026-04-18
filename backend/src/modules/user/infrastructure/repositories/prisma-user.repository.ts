import { PrismaService } from "src/shared/infrastructure/prisma/prisma.service";
import { User } from "../../core/entities/user.entity";
import { UserRepositoryPort } from "../../core/ports/output/user-repository.port";
import { UserAgeGroup, UserInterest, UserRole, UserGender, UserLevel } from "../../core/enums/user-data.enum";
import { User as UserDB } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) return null;

    return this.transformUserToObject(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return this.transformUserToObject(user);
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

  private transformUserToObject(userDB: UserDB): User {
    const role = UserRole[userDB.role];
    const ageGroup = !userDB.ageGroup ? null : UserAgeGroup[userDB.ageGroup];
    const gender = !userDB.gender ? null : UserGender[userDB.gender];
    const interest = userDB.interests.map(v => UserInterest[v]);
    const level = !userDB.level ? null : UserLevel[userDB.level];

    return new User(
      userDB.id,
      userDB.email,
      userDB.isProfileCompleted,
      userDB.firstName,
      userDB.lastName,
      role,
      ageGroup,
      gender,
      interest,
      level,
      userDB.lastLoginAt,
      userDB.createdAt,
      userDB.updatedAt
    );
  }
}