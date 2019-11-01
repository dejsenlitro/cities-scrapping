import {ICityData, ICityTemperature} from "./models";

export interface IWeatherService {
  getTemperaturesInCities(cities: string[]): Promise<ICityTemperature[]>
}

export interface IScrapper {
  getCities(): Promise<string[]>
}

export interface IDatabase {
  insertCityTemperatures(cityTemperatures: ICityTemperature[]): Promise<void>
  insertWeatherData(cityData: ICityData[]): Promise<void>
}

export interface ICache {
  get(): ICityTemperature[]
  set(citiesTemperatures: ICityTemperature[]): void
}

export interface INotesHandler {
  createNote(teperature: number): string
}
