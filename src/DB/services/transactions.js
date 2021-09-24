import transactions from '../models/transactions';

export default class Transactions {
    async add(raw) {
        const transaction = await transactions.create(raw);
        return transaction;
    }

    async get(search) {
        const transaction = await transactions.find(search);
        return transaction;
    }

    async update(search, update) {
        const transaction = await transactions.update(search, update);
        return transaction;
    }
}