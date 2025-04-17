import dotenv from "dotenv";
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
export class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  humidity: number;
  tempF: number;
  windSpeed: number;

  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    humidity: number,
    tempF: number,
    windSpeed: number
  ) {
    this.city = city;
    this.date = date;
    this.icon = icon || "";
    this.iconDescription = iconDescription;
    this.humidity = humidity;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  // TODO: Define the baseURL, API key, and city name properties
  constructor() {
    this.baseURL = process.env.API_BASE_URL || "https://api.openweathermap.org";
    this.apiKey = process.env.API_KEY || "";
    this.cityName = "";
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(query);
    console.log(query);
    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }
    const data = await response.json();
    return data;
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData as Coordinates;
    return {
      lat: lat,
      lon: lon,
    };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData[0]);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    const weatherData = await this.fetchLocationData(query);
    return weatherData;
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const city = response.city.name;
    const date = response.list[0].dt_txt;
    const icon = response.list[0].weather[0].icon;
    const iconDescription = response.list[0].weather[0].description;
    const humidity = response.list[0].main.humidity;
    const tempF = Number(
      (((response.list[0].main.temp - 273.15) * 9) / 5 + 32).toFixed(2)
    ); // Convert from Kelvin to Fahrenheit
    const windSpeed = response.list[0].wind.speed;

    return new Weather(
      city,
      date,
      icon,
      iconDescription,
      humidity,
      tempF,
      windSpeed
    );
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray: Weather[] = [];
    let currentDate = new Date(currentWeather.date);
    for (let i = 0; i < weatherData.length; i++) {
      const date = new Date(weatherData[i].dt_txt);
      if (date.getDate() === currentDate.getDate()) {
        continue; // Skip the current weather data
      }
      const formattedDate = date.toLocaleDateString();
      const icon = weatherData[i].weather[0].icon;
      const iconDescription = weatherData[i].weather[0].description;
      const humidity = weatherData[i].main.humidity;
      const tempF = Number(
        (((weatherData[i].main.temp - 273.15) * 9) / 5 + 32).toFixed(2)
      ); // Convert from Kelvin to Fahrenheit
      const windSpeed = weatherData[i].wind.speed;

      forecastArray.push(
        new Weather(
          currentWeather.city,
          formattedDate,
          icon,
          iconDescription,
          humidity,
          tempF,
          windSpeed
        )
      );
      currentDate = date;
    }
    return forecastArray;
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(
      currentWeather,
      weatherData.list
    );
    return [currentWeather, ...forecastArray];
  }
}

export default new WeatherService();
