import TransactionController from '../../../src/app/controllers/TransactionController';
import TransactionService from '../../../src/app/services/TransactionService';

describe('TransactionController', () => {
  const processSpy = jest.spyOn(TransactionService, 'process');
  const listSpy = jest.spyOn(TransactionService, 'list');
  const fakeRes = { json: jest.fn() };
  const expectedResult = {
    _id: '5fbf16bba3151c0eda18b824',
    value: 200,
    description: 'tes1te',
    method: 'credit_card',
    card_number: '1911',
    card_name: 'Gabriel',
    card_valid: '11/22',
    card_cvv: '927',
    __v: 0,
  };

  describe('#index', () => {
    beforeEach(() => {
      listSpy.mockResolvedValueOnce([expectedResult]);
    });

    it('should call service', async () => {
      await TransactionController.index({}, fakeRes);

      expect(listSpy).toHaveBeenCalledTimes(1);
      expect(fakeRes.json).toHaveBeenCalledWith([expectedResult]);
    });
  });

  describe('#store', () => {
    beforeEach(() => {
      processSpy.mockResolvedValueOnce(expectedResult);
    });

    it('should call service', async () => {
      await TransactionController.store({}, fakeRes);

      expect(processSpy).toHaveBeenCalledTimes(1);
      expect(fakeRes.json).toHaveBeenCalledWith(expectedResult);
    });
  });
});
