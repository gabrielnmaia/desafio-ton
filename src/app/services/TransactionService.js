import Payable from '../schemas/Payable';
import Transaction from '../schemas/Transaction';
import PayableStatus from '../enums/PayableStatus';
import TransactionMethod from '../enums/TransactionMethod';

class TransactionService {
  async list() {
    const transactions = await Transaction.find();
    return transactions;
  }

  async process(transaction) {
    const date = new Date();

    const {
      value,
      description,
      method,
      card_number,
      card_name,
      card_valid,
      card_cvv,
    } = transaction;

    const createdTransaction = await Transaction.create({
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
      value: method === TransactionMethod.CREDIT ? value * 0.95 : value * 0.97,
      payment_date:
        method === TransactionMethod.CREDIT
          ? date.setDate(date.getDate() + 30)
          : date,
      status:
        method === TransactionMethod.CREDIT
          ? PayableStatus.WAITING_FUNDS
          : PayableStatus.PAID,
    });

    return createdTransaction;
  }
}

export default new TransactionService();
