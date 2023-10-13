import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();
    return { success: true, payload: users };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findUserById(id);
    return { success: true, payload: user };
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(
      createUserDto.username,
      createUserDto.email,
      createUserDto.password,
    );
    return { success: true, payload: user };
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateUserDto>,
  ) {
    const user = await this.usersService.updateUser(id, updateData);
    return { success: true, payload: user };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return { success: true };
  }
}
