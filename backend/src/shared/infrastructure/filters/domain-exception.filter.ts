import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { EmailCodeInvalidError } from "src/modules/auth/core/entities/errors/emaill-code-invalid.error";
import { InvalidTokenError } from "src/modules/auth/core/entities/errors/invalid-token.error";
import { TokenExpiredError } from "src/modules/auth/core/entities/errors/token-expired.error";
import { UserAlreadyExistsError } from "src/modules/user/core/entities/errors/user-already-exists.error";
import { UserInvalidEmailError } from "src/modules/user/core/entities/errors/user-invalid-email.error";
import { UserNotFoundError } from "src/modules/user/core/entities/errors/user-not-found.error";
import { DomainError } from "src/shared/core/errors/domain.error";

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const errorMap = new Map([
      [UserNotFoundError, HttpStatus.NOT_FOUND],
      [UserAlreadyExistsError, HttpStatus.BAD_REQUEST],
      [UserInvalidEmailError, HttpStatus.BAD_REQUEST],
      [EmailCodeInvalidError, HttpStatus.UNAUTHORIZED],
      [InvalidTokenError, HttpStatus.UNAUTHORIZED],
      [TokenExpiredError, HttpStatus.UNAUTHORIZED],
    ]);

    const status = errorMap.get(exception.constructor as any) ?? HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      status: "error",
      code: exception.code,
      message: exception.message,
    });
  }
}