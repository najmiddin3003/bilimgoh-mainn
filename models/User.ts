import mongoose, { Schema, type Model } from "mongoose";

export interface IUser {
  phone: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  profileCompleted?: boolean;
  likedCourseIds?: number[];
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      match: /^998\d{9}$/,
    },
    passwordHash: { type: String, required: true, select: false },
    firstName: { type: String, trim: true, default: "" },
    lastName: { type: String, trim: true, default: "" },
    age: { type: Number, min: 10, max: 100 },
    profileCompleted: { type: Boolean, default: false },
    likedCourseIds: { type: [Number], default: [] },
  },
  { timestamps: true },
);

const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);

export default User;
