import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { WeatherService } from './wheather.service';
import { HttpModule } from '@nestjs/axios';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { SchedulerService } from './scheduler.service';
@Module({

  imports: [HttpModule,UserModule],
  providers: [TelegramService,WeatherService,SchedulerService],

})
export class TelegramModule {}
