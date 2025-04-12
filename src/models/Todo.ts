import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";

export enum TodoStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}

export interface ITodo extends Document {
  projectName: string;
  status: TodoStatus;
  link?: string;
  comment?: string;
  date: Date;
  slug: string;
}

const TodoSchema = new Schema<ITodo>(
  {
    projectName: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(TodoStatus),
      default: TodoStatus.PENDING,
    },
    link: { type: String },
    comment: { type: String },
    date: { type: Date, default: Date.now },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

// Automatically generate slug from projectName
TodoSchema.pre("validate", function (next) {
  if (this.projectName) {
    this.slug = slugify(this.projectName, { lower: true, strict: true });
  }
  next();
});

export const Todo = mongoose.model<ITodo>("Todo", TodoSchema);
