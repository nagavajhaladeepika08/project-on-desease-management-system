import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendanceDocument extends Document {
  student: mongoose.Types.ObjectId;
  class: mongoose.Types.ObjectId;
  date: Date;
  status: 'present' | 'absent' | 'leave';
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const attendanceSchema = new Schema<IAttendanceDocument>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'leave'],
      required: true
    },
    remarks: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

// Create index for faster queries
attendanceSchema.index({ student: 1, date: 1 });
attendanceSchema.index({ class: 1, date: 1 });
attendanceSchema.index({ date: 1 });

// Compound index for unique attendance per student per date
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

export default mongoose.model<IAttendanceDocument>('Attendance', attendanceSchema);
