import { Entity, Unique, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Unique(['title'])
  title: string;
  @Column()
  status?: string;
}
