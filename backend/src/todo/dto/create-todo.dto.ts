import { IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(1, { message: 'Title must be at least 1 character' })
  title: string;
}