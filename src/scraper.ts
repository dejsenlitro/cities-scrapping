import cheerio from "cheerio";
import puppeteer from 'puppeteer'
import {IScrapper} from "./interfaces";

export default class Scraper implements IScrapper {
  public async getCities(): Promise<string[]> {
    try {
      console.log('SCRAPPING CITIES')
      const cities: any = await this.scrapeCities()

      const cityNames: string[] = []
      for (const city of cities) {
        const cityName: string = this.getCityName(city)
        cityNames.push(cityName)
      }

      return cityNames
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  private async scrapeCities(): Promise<string[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.viennaairport.com/en/passengers/arrival__departure/departures');
    const content = await page.content()
    const $ = cheerio.load(content)
    const cities: any = []

    $('#flugdaten-abflug')
      .find($('.detail-table__cell.text-uppercase.fdabf-td2'))
      .find($('.hidden-xs'))
      .each((index, element) => cities.push($(element).text()))

    if (cities.length === 0) {
      console.log('RETRYING SCRAPPING CITIES')
      await this.scrapeCities()
    }

    return cities
  }

  private getCityName(city: string): string {
    const split = city.split(' ')
    if (split.length > 1)
      if (split[1] !== split[1].toUpperCase())
        return city

    return split[0]
  }
}
