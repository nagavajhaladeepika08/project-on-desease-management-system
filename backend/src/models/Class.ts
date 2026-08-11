import mongoose, { Schema, Document } from 'mongoose';

export interface IClassDocument extends Document {
  className: string;
  classCode: string;
  department: mongoose.Types.ObjectId;
  classTeacher: mongoose.Types.ObjectId;
  academicYear: string;
  section: string;
  totalStudents: number;
  createdAt: Date;
  updatedAt: Date;
}

const classSchema = new Schema<IClassDocument>(
  {
    className: {
      type: String,
      required: true
    },
    classCode: {
      type: String,
      required: true,
      unique: true
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    classTeacher: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    academicYear: {
      type: String,
      required: true
    },
    section: {
      type: String,
      required: true
    },
    totalStudents: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

classSchema.index({ department: 1 });
classSchema.index({ academicYear: 1 });

export default mongoose.model<IClassDocument>('Class', classSchema);