import BalanceController from '../../../src/app/controllers/BalanceController';
import BalanceService from '../../../src/app/services/BalanceService';

describe('BalanceController', () => {
  const calculateSpy = jest.spyOn(BalanceService, 'calculate');
  const fakeRes = { json: jest.fn() };

  describe('#index', () => {
    const expectedResult = {
      available: 10,
      waiting_funds: 20,
    };

    beforeEach(() => {
      calculateSpy.mockResolvedValueOnce(expectedResult);
    });

    it('should call service', async () => {
      await BalanceController.index({}, fakeRes);

      expect(calculateSpy).toHaveBeenCalledTimes(1);
      expect(fakeRes.json).toHaveBeenCalledWith(expectedResult);
    });
  });
});
