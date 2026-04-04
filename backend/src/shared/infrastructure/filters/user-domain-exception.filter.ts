import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { UserAlreadyExistsError } from "src/modules/user/core/entities/errors/user-already-exists";
import { UserNotFoundError } from "src/modules/user/core/entities/errors/user-not-found.error";
import { DomainError } from "src/shared/core/errors/domain.error";

@Catch(DomainError)
export class UserDomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const errorMap = new Map([
      [UserNotFoundError, HttpStatus.NOT_FOUND],
      [UserAlreadyExistsError, HttpStatus.BAD_REQUEST],
    ]);

    const status = errorMap.get(exception.constructor as any) ?? HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      message: exception.message,
    });
  }
}