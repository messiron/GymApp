import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "src/modules/user/core/enums/user-data.enum";
import { NotAuthorizedError } from "src/shared/core/errors/not-authorized.error";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor (private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<UserRole>(
      "role",
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRole) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user || !user.role || !user.role.includes(requiredRole)) 
      throw new NotAuthorizedError();

    return true;
  }
}