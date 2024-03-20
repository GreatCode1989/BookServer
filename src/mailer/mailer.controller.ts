import { Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send-email')
  async sendEmail() {
    const dto: SendEmailDto = {
      from: { name: 'Nestjs', address: 'wef353wef535@gmail.com' },
      recipients: [
        { name: 'Jon Doe', address: 'jon@example.com' },
        { name: 'Jane Doe', address: 'jane@example.com' },
      ],
      subject: 'Тестовое письмо',
      html: '<p>Это тестовое письмо.</p>',
    };

    return await this.mailerService.sendEmail(dto);
  }
}
