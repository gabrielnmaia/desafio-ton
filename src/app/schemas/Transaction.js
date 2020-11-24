import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  card_number: {
    type: String,
    required: true,
  },
  card_name: {
    type: String,
    required: true,
  },
  card_valid: {
    type: String,
    required: true,
  },
  card_cvv: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Transaction', TransactionSchema);
