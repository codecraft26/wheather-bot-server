import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';
import { TelegramService } from './telegram.service';
import { UserService } from 'src/user/user.service';
import { WeatherService } from './wheather.service';

@Injectable()
export class SchedulerService {
    constructor(
        private telegramService: TelegramService,
        private userService: UserService,
        private weatherService: WeatherService
    ) {
        // Schedule the job to run at 9:00 AM every day
        cron.schedule('0 9 * * *', () => {
            this.sendDailyWeatherUpdates();
        });
    }

    async sendDailyWeatherUpdates() {
        const subscribedUsers = await this.userService.getSubscribedUsers();
        for (const user of subscribedUsers) {
            const userdetails=await this.userService.getUserById(user._id);
            const location = await this.userService.getUserLocation(userdetails.chatId);
            if (location) {

           
                await this.weatherService.getWeather(location).subscribe({

                    next: (data) => {
                        const message = `Good morning! Here's your daily weather update for ${location} \n\n Temperature: ${data.current.temp_c}°C\nCondition: ${data.current.condition.text}`;
                        this.telegramService.sendMessageToUser(userdetails.chatId, message);
                        console.log("message is sent successfully");
                    },
                    error: (err) => {
                        console.log(err);
                    }
                
                });

                

                


               
                

            }
        }
    }
}