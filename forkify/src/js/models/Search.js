import axios from "axios";
import { key, proxy } from "../config";
export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      // const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
      const res = await axios(
        `https://www.food2fork.com/api/search?key=${key}&q=${this.query}`
      );
      console.log(res);
      this.result = res.data.recipes;
      console.log("Searching...");
    } catch (ex) {
      console.log(ex);
    }
  }
}
