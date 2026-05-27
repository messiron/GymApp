import { Module } from "@nestjs/common";
import { EmailSenderPort } from "src/shared/core/ports/email-sender.port";
import { EmailService } from "./email.service";

@Module({
  providers: [
    {
      provide: EmailSenderPort,
      useClass: EmailService,
    },
  ],
  exports: [EmailSenderPort],
})
export class EmailModule {}