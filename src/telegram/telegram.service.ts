import { Injectable, Logger } from '@nestjs/common';
import { WeatherService } from './wheather.service';
import { UserService } from 'src/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/user.model';
import { Model } from 'mongoose';

const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramService {
    private readonly bot: any;
    private logger = new Logger(TelegramService.name);
    private chatStates: Record<number, 'AWAITING_CITY' | 'AWAITING_SUBSCRIPTION'> = {};

    constructor(private weatherService: WeatherService, private userService: UserService,private configService:ConfigService) {
       


        const TELEGRAM_TOKEN = this.configService.get<string>('TELEGRAM_API');
        this.bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

        this.bot.on('message', this.onReceiveMessage);

        this.bot.onText(/\/start/, (msg: any) => {
            const chatId = msg.chat.id;
            this.chatStates[chatId] = 'AWAITING_CITY';
           

            this.handleStartCommand(msg);
            
        });

        this.bot.onText(/\/subscribe/, (msg: any) => {
    

            const chatId = msg.chat.id;
            this.handleSubscription(chatId);
        });



    }

    onReceiveMessage = (msg: any) => {
        const chatId = msg.chat.id;
        const text = msg.text;
    
        if (this.chatStates[chatId] === 'AWAITING_CITY') {
            this.weatherService.getWeather(text).subscribe({
                next: (data) => {
                    const weatherInfo = `Current weather in ${data.location.name}, ${data.location.country}:\nTemperature: ${data.current.temp_c}°C\nCondition: ${data.current.condition.text}`;
                    this.sendMessageToUser(chatId, weatherInfo);
    
                   
                    setTimeout(() => this.offerSubscription(chatId), 2000); // 2-second delay
    
                    this.chatStates[chatId] = 'AWAITING_SUBSCRIPTION';
                },
                error: (error) => {
                    this.sendMessageToUser(chatId, "Sorry, I couldn't fetch the weather for that location. Please try another city.");
                }
            });
        } else if (this.chatStates[chatId] === 'AWAITING_SUBSCRIPTION') {
           
        } else {
            if (text !== '/start') {


                this.bot.sendMessage(chatId, "Please send /start to get current weather information for your city.");
            }
        }
    }




    
    sendMessageToUser = (chatId: number, message: string) => {
        this.bot.sendMessage(chatId, message);
    }


    offerSubscription(chatId: number) {
        this.sendMessageToUser(chatId, "Do you want to subscribe to the weather forecast for your city on a daily basis? Send /subscribe to confirm.");
    }

    handleSubscription(chatId: number) {
        this.userService.subscribeUser(chatId).then(() => {
            this.sendMessageToUser( chatId,"You have subscribed to daily weather updates.");
        }).catch((error) => {
            this.logger.error(`Failed to subscribe user: ${error.message}`);
           
        });
    }


    private handleStartCommand(msg: any) {
        const chatId = msg.chat.id;
        const username = msg.from.username || msg.from.first_name; // Adjust as per Telegram API

        this.userService.findOrCreateUser(chatId, username).then((user) => {
            this.chatStates[chatId] = 'AWAITING_CITY';
            this.bot.sendMessage(chatId, "Welcome to your weather bot, please enter your city name to get started.");
        }).catch((error) => {
            this.logger.error(`Failed to find/create user: ${error.message}`);
           
        });
    }

    }
