import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { WeatherService } from './wheather.service';
import { HttpModule } from '@nestjs/axios';
@Module({

  imports: [HttpModule],
  providers: [TelegramService,WeatherService],
})
export class TelegramModule {}
