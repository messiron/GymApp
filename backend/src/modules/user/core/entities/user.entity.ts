import { DifficultyLevel } from "src/shared/core/global.enum";
import { UserAgeGroup, UserGender, UserInterest, UserRole } from "../enums/user-data.enum";

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public isProfileCompleted: boolean,
    public readonly firstName: string | null,
    public readonly lastName: string | null,
    public readonly role: UserRole,
    public readonly ageGroup: UserAgeGroup | null,
    public readonly gender: UserGender | null,
    public readonly interests: UserInterest[] | null,
    public readonly level: DifficultyLevel | null,
    public readonly lastLoginAt: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null,
  ) {}

  isCompleted() {
    if (
      this.firstName && 
      this.ageGroup && 
      this.gender && 
      this.interests &&
      this.level
    ){
      this.isProfileCompleted = true;
    }
    else {
      this.isProfileCompleted = false;
    }
  }

  static validEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
}