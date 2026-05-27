import { Injectable } from "@nestjs/common";
import { Resend } from "resend";
import { EmailSenderPort } from "src/shared/core/ports/email-sender.port";

@Injectable()
export class EmailService implements EmailSenderPort {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async send({
    to,
    subject,
    html
    }: 
    {
      to: string, 
      subject: string,
      html: string, 
    }): Promise<void> {
    const { error } = await this.resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      subject,
      html,
    });

    if (error) {
      throw error;
    }
  }
}