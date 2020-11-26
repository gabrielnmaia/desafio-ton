import PayableStatus from '../enums/PayableStatus';
import Payable from '../schemas/Payable';

class BalanceService {
  async calculate() {
    const available = await Payable.groupByStatus(PayableStatus.PAID);
    const waitingFunds = await Payable.groupByStatus(
      PayableStatus.WAITING_FUNDS
    );

    return {
      available,
      waiting_funds: waitingFunds,
    };
  }
}

export default new BalanceService();
