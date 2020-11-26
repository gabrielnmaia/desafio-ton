import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';
import Payable from '../../src/app/schemas/Payable';

describe('Balance', () => {
  beforeAll(async () => {
    await Payable.deleteMany({});
    await Payable.create({
      value: 100,
      payment_date: new Date(),
      status: 'paid',
    });
    await Payable.create({
      value: 50,
      payment_date: new Date(),
      status: 'waiting_funds',
    });
    await Payable.create({
      value: 10,
      payment_date: new Date(),
      status: 'paid',
    });
    await Payable.create({
      value: 40,
      payment_date: new Date(),
      status: 'waiting_funds',
    });
  });

  afterAll(async () => {
    await Payable.deleteMany({});
    await mongoose.connection.close();
  });

  describe('/GET Balance', () => {
    it('should fetch database and retrieve user balance', async () => {
      const res = await request(app).get('/balance');

      expect(res.body).toMatchObject({
        available: 110,
        waiting_funds: 90,
      });
    });
  });
});
