import {ICache} from "./interfaces";
import {ICityTemperature} from "./models";

export default class Cache implements ICache {
  private cityTemperatures: ICityTemperature[] = []

  get(): ICityTemperature[] {
    return this.cityTemperatures
  }

  set(cityNames: ICityTemperature[]): void {
    this.cityTemperatures = cityNames
  }
}
