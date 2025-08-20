import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";

export enum TodoStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}
export interface IComment {
  text: string;
  date: Date;
}

export interface ITodo extends Document {
  projectName: string;
  status: TodoStatus;
  link?: string;
  comment?: string;
  stageUrl?: string;
  desc?: string;
  date: Date;
  startDate: Date;
  endDate: Date;
  slug: string;
  developers: string[];
  comments: IComment[];
}
const CommentSchema = new Schema<IComment>({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const TodoSchema = new Schema<ITodo>(
  {
    projectName: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(TodoStatus),
      default: TodoStatus.PENDING,
    },
    stageUrl: { type: String },
    link: { type: String },
    comment: { type: String },
    desc: { type: String },
    date: { type: Date, default: Date.now },
    startDate: { type: Date },
    endDate: { type: Date },
    slug: { type: String, unique: true },
    developers: [{ type: String }],
    comments: [CommentSchema],
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
