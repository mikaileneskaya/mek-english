import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "Username area is required"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email area is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password area is required"],
      minLength: [4, "At least 4 characters"],
    },
    selectedWords: {
      type: Array,
      default: [],
    },
    kelimem: {
      type: Number,
      default: 0,
      max: 58,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);

export default User;
