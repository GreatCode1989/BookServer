import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: 465,
      secure: true,
      auth: {
        user: 'nestjsvue@gmail.com',
        pass: 'wef333wef333wef',
      },
    });

    return transporter;
  }

  async sendEmail(dto: SendEmailDto) {
    const { from, recipients, subject, html, placeholderReplacements } = dto;

    const transport = this.mailTransport();

    const options: Mail.Options = {
      from: from ?? {
        name: this.configService.get<string>('APP_NAME'),
        address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
      },
      to: recipients,
      subject,
      html,
    };

    try {
      const result = await transport.sendMail(options);

      return result;
    } catch (error) {
      console.log('Error:', error);
    }
  }
}
