import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { NestRolesDataAccessModule } from '@valkyrix/nest-roles-data-access';

@Module({
  imports: [NestRolesDataAccessModule],
  controllers: [RolesController],
  providers: [],
  exports: [],
})
export class NestRolesFeatureModule {}
