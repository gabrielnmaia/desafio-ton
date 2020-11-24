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

export default mongoose.model('Payable', PayableSchema);
