import mongoose, { Schema, Document } from 'mongoose';

export interface IDepartmentDocument extends Document {
  departmentName: string;
  departmentCode: string;
  headOfDepartment: mongoose.Types.ObjectId;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const departmentSchema = new Schema<IDepartmentDocument>(
  {
    departmentName: {
      type: String,
      required: true,
      unique: true
    },
    departmentCode: {
      type: String,
      required: true,
      unique: true
    },
    headOfDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    description: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

DepartmentSchema.index({ departmentCode: 1 });

export default mongoose.model<IDepartmentDocument>('Department', departmentSchema);