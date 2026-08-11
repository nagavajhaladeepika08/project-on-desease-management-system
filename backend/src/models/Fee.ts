import mongoose, { Schema, Document } from 'mongoose';

export interface IFeeDocument extends Document {
  student: mongoose.Types.ObjectId;
  amount: number;
  feeType: string;
  dueDate: Date;
  paidDate?: Date;
  status: 'pending' | 'paid' | 'overdue';
  paymentMethod?: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const feeSchema = new Schema<IFeeDocument>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    feeType: {
      type: String,
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    paidDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'overdue'],
      default: 'pending'
    },
    paymentMethod: {
      type: String
    },
    transactionId: {
      type: String
    }
  },
  { timestamps: true }
);

feeSchema.index({ student: 1 });
feeSchema.index({ status: 1 });
feeSchema.index({ dueDate: 1 });

export default mongoose.model<IFeeDocument>('Fee', feeSchema);