import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class WeatherService {
 
    private readonly logger = new Logger(WeatherService.name);

    private apiKey: string;

    constructor(private httpService: HttpService, private configService: ConfigService) {
        this.apiKey = this.configService.get<string>('WHEATHER');
    }

    getWeather(city: string): Observable<any> {
        const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${this.apiKey}`;
        return this.httpService.get(url).pipe(
            map(response => response.data),
            catchError(err => {
                this.logger.error(`Error fetching weather data: ${err.message}`);
                return throwError(() => new Error('Failed to fetch weather data'));
            })
        );
    }
}