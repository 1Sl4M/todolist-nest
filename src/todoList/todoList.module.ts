import { Module } from '@nestjs/common';
import { TodoListController } from './todoList.controller';
import { TodoListService } from './todoList.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './schemas/todoList.schema';
import { Todo } from './schemas/todoList.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  providers: [TodoListService],
  controllers: [TodoListController],
})
export class TodoListModule {}
