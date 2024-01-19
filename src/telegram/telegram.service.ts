import { Injectable } from '@nestjs/common';
import { WeatherService } from './wheather.service';
const TelegramBot = require('node-telegram-bot-api');


@Injectable()
export class TelegramService {



    constructor(private weatherService: WeatherService) {
       
    }


}
