import { UserRole } from "src/modules/user/core/enums/user-data.enum";

export interface JwtPayload {
  sub: string,
  email: string,
  role: UserRole,
}