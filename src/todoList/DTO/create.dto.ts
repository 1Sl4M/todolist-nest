import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDto {
  id: number;
  @ApiProperty()
  @MaxLength(10)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  title: string;
  @MaxLength(10)
  @MinLength(2)
  @ApiProperty()
  @IsNotEmpty()
  status: 'todo' | 'done' | 'in progress';
}
