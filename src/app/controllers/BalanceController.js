import BalanceService from '../services/BalanceService';

class BalanceController {
  async index(_req, res) {
    const balance = await BalanceService.calculate();

    return res.json(balance);
  }
}

export default new BalanceController();
