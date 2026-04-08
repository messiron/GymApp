import { EmailCodeRepositoryPort } from '../../core/ports/output/email-code-repository.port';
import { PrismaService } from 'src/shared/infrastructure/prisma/prisma.service';
import { EmailCode } from '../../core/entities/email-code.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaEmailCodeRepository implements EmailCodeRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(emailCode: EmailCode): Promise<void> {
    await this.prisma.emailCode.create({
      data: {
        id: emailCode.id,
        email: emailCode.email,
        code: emailCode.code,
        expires: emailCode.expiresAt,
        createdAt: emailCode.createdAt,
      },
    });
  }

  async findByEmail(email: string): Promise<EmailCode | null> {
    const code = await this.prisma.emailCode.findUnique({ where: { email } });

    if (!code) return null;

    return new EmailCode(
      code.id,
      code.email,
      code.code,
      code.expires,
      code.createdAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.emailCode.delete({ where: { id } });
  }

  async deleteByEmail(email: string): Promise<void> {
    await this.prisma.emailCode.delete({ where: { email } });
  }
}
