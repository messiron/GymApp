import { UserAgeGroup, UserGender, UserInterest, UserLevel, UserRole } from "generated/prisma/enums";

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly isProfileCompleted: boolean,
    public readonly firstName: string | null,
    public readonly lastName: string | null,
    public readonly role: UserRole,
    public readonly ageGroup: UserAgeGroup | null,
    public readonly gender: UserGender | null,
    public readonly interests: UserInterest[] | null,
    public readonly level: UserLevel | null,
    public readonly lastLoginAt: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null,
  ) {}

  isCompleted(): Boolean {
    if (
      this.firstName && 
      this.lastName && 
      this.ageGroup && 
      this.gender && 
      this.interests &&
      this.level
    ) return true;
    
    return false;
  }

  static validEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
}