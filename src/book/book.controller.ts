import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from '../schemas/book.schema';
import { BookGuard } from './guard/book.guard';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @UseGuards(BookGuard)
  @Post()
  async createBook(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.create(book);
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    try {
      return this.bookService.findById(id);
    } catch (error) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    try {
      return this.bookService.updateById(id, book);
    } catch (error) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    try {
      await this.bookService.deleteById(id);
    } catch (error) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
  }
}
