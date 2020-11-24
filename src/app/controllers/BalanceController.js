import Payable from '../schemas/Payable';

class BalanceController {
  async index(req, res) {
    const waiting_funds = await Payable.aggregate([
      {
        $match: { $and: [{ status: 'waiting_funds' }] },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: '$value',
          },
        },
      },
    ]);

    const avaible = await Payable.aggregate([
      {
        $match: { $and: [{ status: 'paid' }] },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: '$value',
          },
        },
      },
    ]);

    return res.json({
      avaible: avaible[0].total,
      waiting_funds: waiting_funds[0].total,
    });
  }
}

export default new BalanceController();
