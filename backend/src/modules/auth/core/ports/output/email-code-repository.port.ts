import { EmailCode } from "../../entities/email-code.entity";


export abstract class EmailCodeRepositoryPort {
  abstract create(emailCode: EmailCode): Promise<void>;
  abstract findByEmail(email: string): Promise<EmailCode| null>;
  abstract delete(id: string): Promise<void>;
  abstract deleteByEmail(email: string): Promise<void>;
}