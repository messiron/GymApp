import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/modules/user/core/enums/user-data.enum";

export const ROLES_KEY = "role";

export const Role = (role : UserRole) =>
  SetMetadata(ROLES_KEY, role);