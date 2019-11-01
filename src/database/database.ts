import pgPromise, {ColumnSet} from 'pg-promise'
import {IDatabase} from "../interfaces";
import {cityDataCS, cityTemperaturesCS} from "./columnSets";
import {ICityData, ICityTemperature} from "../models";
import {DatabaseOptions} from "../config";


export default class Database implements IDatabase {
  private readonly pgp: pgPromise.IMain
  private db: pgPromise.IDatabase<any>
  private cityDataCS: ColumnSet | undefined
  private cityTemperatures: ColumnSet | undefined

  constructor() {
    this.pgp = pgPromise()
    this.db = this.pgp(DatabaseOptions)

    this.createColumnSets()
  }

  public async insertCityTemperatures(cityTemperatures: ICityTemperature[]): Promise<void> {
    await this.db.none(this.pgp.helpers.insert({cityTemperatures: JSON.stringify(cityTemperatures)}, this.cityTemperatures))
  }

  public async insertWeatherData(cityData: ICityData[]): Promise<void> {
    await this.db.none(this.pgp.helpers.insert(cityData, this.cityDataCS))
  }

  private createColumnSets() {
    const cityDataTable = new this.pgp.helpers.TableName({table: 'cities_data', schema: 'weather'})

    this.cityDataCS = new this.pgp.helpers.ColumnSet(cityDataCS, {table: cityDataTable})

    const cityNamesTable = new this.pgp.helpers.TableName({table: 'city_temperatures', schema: 'weather'})

    this.cityTemperatures = new this.pgp.helpers.ColumnSet(cityTemperaturesCS, {table: cityNamesTable})
  }
}
