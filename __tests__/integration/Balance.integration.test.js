import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';
import Payable from '../../src/app/schemas/Payable';

describe('Balance', () => {
  beforeAll(async () => {
    await Payable.create({
      value: 190,
      payment_date: new Date(),
      status: 'paid',
    });
    await Payable.create({
      value: 150,
      payment_date: new Date(),
      status: 'waiting_funds',
    });
  });

  afterAll(async () => {
    await Payable.remove({});
    await mongoose.connection.close();
  });

  describe('/GET Balance', () => {
    it('should fetch database and retrieve user balance', async () => {
      const res = await request(app).get('/balance');

      expect(res.body).toMatchObject({
        available: 190,
        waiting_funds: 150,
      });
    });
  });
});
