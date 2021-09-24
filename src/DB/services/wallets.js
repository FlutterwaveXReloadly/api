import wallets from "../models/wallets";

export default class Wallets {
   async getWallets(search) {
    try {
      const wallet = await wallets.find(search);
      return wallet;
    } catch (error) {
      throw error;
    }
  }

   async createWallet(data) {
    try {
      const wallet = await wallets.create(data);
      return wallet;
    } catch (error) {
      throw error;
    }
  }

   async updateWallet(search, data) {
    try {
      const wallet = await wallets.updateOne(search, data);
      return wallet;
    } catch (error) {
      throw error;
    }
  }

   async deleteWallet(id) {
    try {
      const wallet = await wallets.findByIdAndDelete(id);
      return wallet;
    } catch (error) {
      throw error;
    }
  }
}
