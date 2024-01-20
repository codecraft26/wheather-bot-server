import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class WeatherService {
    private readonly apiKey = 'f0ba90cdbf774037899174614241901'
    private readonly logger = new Logger(WeatherService.name);

    constructor(private httpService: HttpService) {}

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