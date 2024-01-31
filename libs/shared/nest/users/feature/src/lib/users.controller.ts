import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { IUser } from '@valkyrix/domain-interfaces';
import { User, UsersService } from '@valkyrix/nest-users-data-access';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get('')
  findAll(@Query() options?: never): Promise<User[]> {
    return this.usersService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post('')
  create(@Body() userData: Partial<IUser>): Promise<User> {
    return this.usersService.create(userData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userData: Partial<IUser>): Promise<User> {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
