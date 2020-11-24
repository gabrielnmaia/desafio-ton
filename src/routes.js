import { Router } from 'express';
import TransactionController from './app/controllers/TransactionController';
import BalanceController from './app/controllers/BalanceController';

const routes = new Router();

routes.get('/transaction', TransactionController.index);
routes.post('/transaction', TransactionController.store);
routes.get('/balance', BalanceController.index);

export default routes;
