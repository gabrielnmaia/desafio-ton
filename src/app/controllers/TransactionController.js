import Transaction from '../schemas/Transaction';
import Payable from '../schemas/Payable';

class TransactionController {
  async index(req, res) {
    const transactions = await Transaction.find();

    return res.json(transactions);
  }

  async store(req, res) {
    const {
      value,
      description,
      method,
      card_number,
      card_name,
      card_valid,
      card_cvv,
    } = req.body;

    try {
      const date = new Date();

      const transaction = await Transaction.create({
        value,
        description,
        method,
        card_number: card_number.substring(
          card_number.length - 4,
          card_number.length
        ),
        card_name,
        card_valid,
        card_cvv,
      });

      await Payable.create({
        value: method === 'credit_card' ? value * 0.95 : value * 0.97,
        payment_date:
          method === 'credit_card' ? date.setDate(date.getDate() + 30) : date,
        status: method === 'credit_card' ? 'waiting_funds' : 'paid',
      });

      return res.json(transaction);
    } catch (err) {
      return res.json(err);
    }
  }
}

export default new TransactionController();
