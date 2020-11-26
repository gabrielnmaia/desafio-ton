import TransactionService from '../services/TransactionService';

class TransactionController {
  async index(req, res) {
    const transactions = await TransactionService.list();

    return res.json(transactions);
  }

  async store(req, res) {
    try {
      const transaction = await TransactionService.process(req.body);
      return res.json(transaction);
    } catch (err) {
      return res.json(err);
    }
  }
}

export default new TransactionController();
