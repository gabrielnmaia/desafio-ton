import mongoose from 'mongoose';

const PayableSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  payment_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

PayableSchema.statics.groupByStatus = async function (status) {
  const result = await this.model('Payable').aggregate([
    {
      $match: { $and: [{ status }] },
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

  return result[0].total;
};

export default mongoose.model('Payable', PayableSchema);
