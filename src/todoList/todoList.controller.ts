import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateDto } from './DTO/create.dto';
import { UpdateDto } from './DTO/update.dto';
import { TodoListService } from './todoList.service';
import { Todo } from './entities/todo.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('app')
export class TodoListController {
  constructor(private todoListService: TodoListService) {}

  @ApiOkResponse({ type: Todo, isArray: true, description: 'title' })
  @ApiQuery({ name: 'title', required: false })
  @Get()
  findAll(): Promise<Todo[]> {
    try {
      return this.todoListService.findAll();
    } catch (err) {
      throw new InternalServerErrorException('Failed to get all todos');
    }
  }

  @ApiOkResponse({ type: Todo, description: 'one todo' })
  @ApiQuery({ name: 'title', required: false })
  @ApiNotFoundResponse()
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Todo> {
    const todo = await this.todoListService.findById(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  @ApiOkResponse({ type: Todo, isArray: true, description: 'title' })
  @ApiQuery({ name: 'title', required: false })
  @Get()
  async findAllWithPagination(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Todo[]> {
    const todos = await this.todoListService.findAllWithPagination(page, limit);

    if (!todos) {
      throw new InternalServerErrorException('Failed to get todo');
    }
    return todos;
  }

  @ApiCreatedResponse({ type: Todo })
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createDto: CreateDto): Promise<Todo> {
    return this.todoListService.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDto: UpdateDto): Promise<Todo> {
    return this.todoListService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<Todo> {
    return this.todoListService.delete(id);
  }
}
