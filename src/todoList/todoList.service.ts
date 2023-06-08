import { Injectable } from '@nestjs/common';
import { CreateDto } from './DTO/create.dto';
import { UpdateDto } from './DTO/update.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schemas/todoList.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoListService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findById(id: number): Promise<Todo> {
    return this.todoModel.findById(id).exec();
  }

  async findAllWithPagination(page: number, limit: number): Promise<Todo[]> {
    const skip = (page - 1) * limit;
    const todos = await this.todoModel.find().skip(skip).limit(limit).exec();
    return todos;
  }

  async create(createDto: CreateDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createDto);
    return createdTodo.save();
  }

  async update(id: number, updateDto: UpdateDto): Promise<Todo> {
    return this.todoModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
  }

  async delete(id: number): Promise<Todo> {
    return this.todoModel.findByIdAndDelete(id).exec();
  }
}
