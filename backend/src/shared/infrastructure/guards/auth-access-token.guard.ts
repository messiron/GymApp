import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JsonWebTokenError, JwtService, TokenExpiredError as JwtExpiredError } from "@nestjs/jwt";
import { InvalidTokenError } from "src/modules/auth/core/entities/errors/invalid-token.error";
import { TokenExpiredError } from "src/modules/auth/core/entities/errors/token-expired.error";

@Injectable()
export class AuthAccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new InvalidTokenError();

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        { secret: process.env.ACCESS_TOKEN_SECRET }
      );

      request.user = payload;
    } catch (error) {
      if (error instanceof JsonWebTokenError) throw new InvalidTokenError();
      else if (error instanceof JwtExpiredError) throw new TokenExpiredError();

      throw error;
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}