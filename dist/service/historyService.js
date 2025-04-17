import fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { v4 as uuid4 } from "uuid";
// TODO: Define a City class with name and id properties
class City {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
// TODO: Complete the HistoryService class
class HistoryService {
    constructor() {
        this.filePath = path.join(__dirname, "../../db", "searchHistory.json");
    }
    // TODO: Define a read method that reads from the searchHistory.json file
    // private async read() {}
    async read() {
        try {
            const data = await fs.readFile(this.filePath, "utf-8");
            const cities = JSON.parse(data);
            return cities;
        }
        catch (error) {
            console.error("Error reading search history!", error);
            return [];
        }
    }
    // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
    async write(cities) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
        }
        catch (error) {
            console.error("Error writing search history!");
        }
    }
    // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
    // async getCities() {}
    async getCities() {
        return await this.read();
    }
    // TODO Define an addCity method that adds a city to the searchHistory.json file
    async addCity(city) {
        const cities = await this.getCities();
        const newCity = new City(uuid4(), city);
        cities.unshift(newCity);
        await this.write(cities);
    }
    // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
    // async removeCity(id: string) {}
    async removeCity(id) {
        let cities = await this.getCities();
        cities = cities.filter((city) => city.id !== id);
        await this.write(cities);
    }
}
export default new HistoryService();
