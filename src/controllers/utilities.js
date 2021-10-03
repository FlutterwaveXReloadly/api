// this contains utility features that support core functionalities
import out from "../helpers/out";
import { getBanks } from "../helpers/rave";
import { get, set } from "../helpers/redis";

export default class Utilities {
  async getBanks(req, res) {
    try {
      const { country } = req.params;
      const cache = await get(`banks_${country}`);
      if (cache) {
        return out(res, cache, 200, "Banks retrieved", undefined);
      }
      const banks = await getBanks(country);
      if (banks.status !== "success") {
        return out(res, banks, 400, "Banks not retrieved", "CUT0-0");
      }
      if (banks.data.length === 0) {
        return out(res, banks, 400, "Banks not retrieved", "CUT0-1");
      }
      set(`banks_${country}`, banks.data);
      return out(res, banks, 200, "Banks retrieved", undefined);
    } catch (err) {
      console.log(err);
      return out(res, {}, 500, "An error occurred", "CUT0-2");
    }
  }
}
