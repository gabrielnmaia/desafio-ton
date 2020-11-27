import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';
import Transaction from '../../src/app/schemas/Transaction';
import Payable from '../../src/app/schemas/Payable';

describe('Transaction + Balance', () => {
  beforeAll(async () => {
    await Payable.deleteMany({});
    const payables = [
      {
        value: 100,
        payment_date: new Date(),
        status: 'paid',
      },
      {
        value: 50,
        payment_date: new Date(),
        status: 'waiting_funds',
      },
      {
        value: 10,
        payment_date: new Date(),
        status: 'paid',
      },
    ];
    await Payable.create(payables);
  });

  afterAll(async () => {
    await Transaction.deleteMany({});
    await Payable.deleteMany({});
    await mongoose.connection.close();
  });

  describe('/PUT Transaction', () => {
    it('should process a transaction', (done) => {
      request(app)
        .post('/transaction')
        .send({
          value: 200,
          description: 'teste 2',
          method: 'credit_card',
          card_number: '1234567891011',
          card_name: 'Gabriel Maia',
          card_valid: '10/22',
          card_cvv: '123',
        })
        .end((err, res) => {
          expect(res.body).toHaveProperty('_id');
          done();
        });
    });
  });

  describe('/GET Transaction', () => {
    it('should list all transactions', (done) => {
      request(app)
        .get('/transaction')
        .end((err, res) => {
          expect(res.body).toHaveLength(1);
          done();
        });
    });
  });

  describe('/GET Balance', () => {
    it('should fetch database and retrieve user balance', (done) => {
      request(app)
        .get('/balance')
        .end((err, res) => {
          expect(res.body).toMatchObject({
            available: 110,
            waiting_funds: 240,
          });
          done();
        });
    });
  });
});
