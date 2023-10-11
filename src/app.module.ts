import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [UsersModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
