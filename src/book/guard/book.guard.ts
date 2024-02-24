import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BookGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { title, description, author, category, price } = request.body;

    if (!description) {
      throw new UnauthorizedException('Поле description обязательно');
    }

    if (!price) {
      throw new UnauthorizedException('Поле price обязательно');
    }

    if (!title) {
      throw new UnauthorizedException('Поле title обязательно');
    }

    if (!author) {
      throw new UnauthorizedException('Поле author обязательно');
    }

    if (!category) {
      throw new UnauthorizedException('Поле category обязательно');
    }

    return true;
  }
}
