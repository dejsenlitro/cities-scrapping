import Database from "./database/database";
import Scraper from "./scraper";
import WeatherService from "./weatherService";
import Main from "./main";
import Cache from "./cache";
import {ONE_HOUR_MS} from "./constants";
import NotesHandler from "./notesHandler";

const main = new Main(new Database(), new Scraper(), new WeatherService(), new Cache(), new NotesHandler())
main.insertNewData()

setInterval(() => {
  main.insertNewData()
}, ONE_HOUR_MS) // 1 hour
