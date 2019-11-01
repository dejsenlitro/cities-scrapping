import axios from "axios";
import {IWeatherService} from "./interfaces";
import {CELSIUS_KELVIN_DIFFERENCE} from "./constants";
import {ICityTemperature} from "./models";

export default class WeatherService implements IWeatherService {
  public async getTemperaturesInCities(cities: string[]): Promise<ICityTemperature[]> {
    try {
      const cityTemperatures: ICityTemperature[] = []
      for (const city of cities) {
        try {
          const cityData: ICityTemperature = await this.getCityTemperature(city)
          cityTemperatures.push(cityData)
        } catch (e) {
          console.error('Failed to get weather for city: ', city, '. Attempting with split name')
          try {
            const newCityData = await this.handleFailedRequest(city)
            cityTemperatures.push(newCityData)
          } catch (e) {
            console.error('Failed to get weather for city: ', city)
            continue
          }
        }
      }

      return cityTemperatures
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  private async getCityTemperature(city: string): Promise<ICityTemperature> {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=832e7a7c50a5e9f241fe4fdfd9059d8f`)
    const temperature: number = response.data.main.temp - CELSIUS_KELVIN_DIFFERENCE
    const cityData: ICityTemperature = {
      city,
      temperature,
    }

    return cityData
  }

  // This function is used to retry requests to get weather for cities for which it failed (eg: Oslo-Torp, Stockholm Skavsta).
  // This happens because the name of the airport is not the same as the name of the city
  private async handleFailedRequest(city: string): Promise<ICityTemperature> {
    if (city.split(' ').length > 1) {
      const newCityName: string = city.split(' ')[0]

      return this.getCityTemperature(newCityName)
    } else if (city.split('-').length > 1) {
      const newCityName: string = city.split('-')[0]

      return this.getCityTemperature(newCityName)
    }

    throw new Error('Failed to split')
  }
}
