import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(@Query('search') search?: string) {
    return this.todoService.findAll(search);
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto.title);
  }

  @Patch(':id')
  toggleComplete(@Param('id') id: string) {
    const idNumber = parseInt(id, 10);
    return this.todoService.toggleComplete(idNumber);
  }
}