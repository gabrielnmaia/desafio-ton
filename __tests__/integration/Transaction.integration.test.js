import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';
import Transaction from '../../src/app/schemas/Transaction';
import Payable from '../../src/app/schemas/Payable';

describe('Transaction', () => {
  beforeAll(async () => {
    await Transaction.create({
      value: 100,
      description: 'teste',
      method: 'debit_card',
      card_number: '1234567891011',
      card_name: 'Gabriel Maia',
      card_valid: '10/22',
      card_cvv: '123',
    });
  });

  afterAll(async () => {
    await Transaction.deleteMany({});
    await Payable.deleteMany({});
    await mongoose.connection.close();
  });

  describe('/PUT Transaction', () => {
    it('should process a transaction', async () => {
      const res = await request(app).post('/transaction').send({
        value: 200,
        description: 'teste 2',
        method: 'credit_card',
        card_number: '1234567891011',
        card_name: 'Gabriel Maia',
        card_valid: '10/22',
        card_cvv: '123',
      });

      expect(res.body).toHaveProperty('_id');
    });
  });

  describe('/GET Transaction', () => {
    it('should list all transactions', async () => {
      const res = await request(app).get('/transaction');

      expect(res.body).toHaveLength(2);
    });
  });
});
