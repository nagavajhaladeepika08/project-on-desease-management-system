import mongoose, { Schema, Document } from 'mongoose';

export interface IMarksDocument extends Document {
  student: mongoose.Types.ObjectId;
  subject: mongoose.Types.ObjectId;
  exam: string;
  marks: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  createdAt: Date;
  updatedAt: Date;
}

const marksSchema = new Schema<IMarksDocument>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: true
    },
    exam: {
      type: String,
      required: true
    },
    marks: {
      type: Number,
      required: true
    },
    totalMarks: {
      type: Number,
      required: true,
      default: 100
    },
    percentage: {
      type: Number
    },
    grade: {
      type: String,
      enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']
    }
  },
  { timestamps: true }
);

marksSchema.index({ student: 1 });
marksSchema.index({ subject: 1 });
marksSchema.index({ exam: 1 });

export default mongoose.model<IMarksDocument>('Marks', marksSchema);