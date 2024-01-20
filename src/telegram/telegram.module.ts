import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { WeatherService } from './wheather.service';
import { HttpModule } from '@nestjs/axios';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
@Module({

  imports: [HttpModule,UserModule],
  providers: [TelegramService,WeatherService],

})
export class TelegramModule {}
