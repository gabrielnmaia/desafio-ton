import BalanceService from '../../../src/app/services/BalanceService';
import PayableStatus from '../../../src/app/enums/PayableStatus';
import Payable from '../../../src/app/schemas/Payable';

describe('BalanceService', () => {
  const groupByStatusSpy = jest.spyOn(Payable, 'groupByStatus');

  describe('#calculate', () => {
    beforeEach(() => {
      groupByStatusSpy.mockResolvedValueOnce(10);
      groupByStatusSpy.mockResolvedValueOnce(20);
    });

    it('should agg values by status', async () => {
      await BalanceService.calculate();

      expect(groupByStatusSpy).toHaveBeenCalledTimes(2);
      expect(groupByStatusSpy).toHaveBeenCalledWith(PayableStatus.PAID);
      expect(groupByStatusSpy).toHaveBeenCalledWith(
        PayableStatus.WAITING_FUNDS
      );
    });

    it('should return balance properly', async () => {
      const res = await BalanceService.calculate();

      expect(res).toMatchObject({
        available: 10,
        waiting_funds: 20,
      });
    });
  });
});
