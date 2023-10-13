import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';

const users = [
  { id: '1', username: 'mark morgan', email: 'mark@morgan.com' },
  { id: '2', username: 'keith richards', email: 'keith@richards.com' },
];

@Controller('users')
export class UsersController {
  @Get()
  async getUsers() {
    return { success: true, payload: users };
  }

  @Get(':id')
  async getUser(@Param() params: any) {
    const user = users.find((user) => user.id === params.id);
    return user
      ? { success: true, payload: user }
      : { success: true, payload: null };
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;
    return { success: true, payload: { username, email, password } };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    return { success: true };
  }
}
