import TransactionService from '../../../src/app/services/TransactionService';
import Transaction from '../../../src/app/schemas/Transaction';

describe('TransactionService', () => {
  const findSpy = jest.spyOn(Transaction, 'find');
  const expectedResult = [
    {
      _id: '5fbf16bba3151c0eda18b824',
      value: 200,
      description: 'tes1te',
      method: 'credit_card',
      card_number: '1911',
      card_name: 'Gabriel',
      card_valid: '11/22',
      card_cvv: '927',
      __v: 0,
    },
  ];
  describe('#list', () => {
    beforeEach(() => {
      findSpy.mockResolvedValueOnce(expectedResult);
    });
    it('should return Transaction list properly', async () => {
      const res = await TransactionService.list();

      expect(res).toMatchObject(expectedResult);
    });
  });
});
