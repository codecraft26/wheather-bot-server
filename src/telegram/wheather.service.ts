import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherService {
    private readonly apiKey = 'f0ba90cdbf774037899174614241901'; // Replace with your API key

    constructor(private httpService: HttpService) {}
    // https://api.weatherapi.com/v1/current.json?q=${city}&key=${this.apiKey}
    getWeather(city: string) {
        const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${this.apiKey}`;
        return this.httpService.get(url).pipe(map(response => response.data));
    }
}
