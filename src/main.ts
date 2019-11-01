import {IScrapper, IWeatherService, IDatabase, ICache, INotesHandler} from "./interfaces";
import {ICityData, ICityTemperature} from "./models";

export default class Main {
  private retries: number = 0

  constructor(
    private database: IDatabase,
    private scrapper: IScrapper,
    private weatherService: IWeatherService,
    private cache: ICache,
    private notesHandler: INotesHandler
  ) {}

  public async insertNewData() {
    try {
      console.log('INSERTING NEW DATA')
      this.retries = 0

      const scrappedCityNames: string[] = await this.scrapper.getCities()

      const cityTemperatures: ICityTemperature[] = await this.weatherService.getTemperaturesInCities(scrappedCityNames)
      await this.database.insertCityTemperatures(cityTemperatures)

      this.cache.set(cityTemperatures)

      await this.insertData()
      console.log('DATA INSERTED')
    } catch (e) {
      console.error(e)
    }
  }

  private async insertData() {
    try {
      const cityTemperatures: ICityTemperature[] = this.cache.get()

      const citiesData: ICityData[] = []
      for (const city of cityTemperatures) {
        try {
          const cityData: ICityData = {
            city: city.city,
            temperature: city.temperature,
            note: this.notesHandler.createNote(city.temperature),
          }
          citiesData.push(cityData)
        } catch (e) {
          continue
        }
      }

      if (citiesData.length > 0)
        await this.database.insertWeatherData(citiesData)
      this.retries = 0
    } catch (e) {
      if (this.retries < 3) {
        await this.insertData()
        this.retries++
      }
    }
  }
}
