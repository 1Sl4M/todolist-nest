import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { /*mongoose*/ Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  status: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
