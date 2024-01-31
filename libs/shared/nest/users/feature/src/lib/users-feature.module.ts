import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersDataAccessModule } from '@valkyrix/nest-users-data-access';

@Module({
  imports: [UsersDataAccessModule],
  controllers: [UsersController],
  providers: [],
  exports: [],
})
export class UsersFeatureModule {}
