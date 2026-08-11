import mongoose, { Schema, Document } from 'mongoose';

export interface ISubjectDocument extends Document {
  subjectName: string;
  subjectCode: string;
  department: mongoose.Types.ObjectId;
  credits: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const subjectSchema = new Schema<ISubjectDocument>(
  {
    subjectName: {
      type: String,
      required: true
    },
    subjectCode: {
      type: String,
      required: true,
      unique: true
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    credits: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

subjectSchema.index({ department: 1 });
subjectSchema.index({ subjectCode: 1 });

export default mongoose.model<ISubjectDocument>('Subject', subjectSchema);