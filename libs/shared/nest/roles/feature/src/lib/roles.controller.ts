import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { IRole } from '@valkyrix/domain-interfaces';
import { RolesService, Role } from '@valkyrix/nest-roles-data-access';

@Controller('nest-roles-feature')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get('')
  findAll(@Query() options?: never): Promise<Role[]> {
    return this.rolesService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Post('')
  create(@Body() roleData: Partial<IRole>): Promise<Role> {
    return this.rolesService.create(roleData)
  }

  @Patch('id')
  update(@Param('id') id: string, @Body() roleData: Partial<IRole>): Promise<Role> {
    return this.rolesService.update(id, roleData);
  }

  @Delete('id')
  delete(@Param('id') id: string): Promise<Role> {
    return this.rolesService.delete(id)
  }
}
