import mongoose from "mongoose";

const { Schema } = mongoose;

const englishSchema = new Schema(
  {
    ingilizcesi: {
      type: String,
      required: true,
      lowercase: true,
    },
    turkcesi: {
      type: String,
      required: true,
      lowercase: true,
    },
    cumle: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const English = mongoose.model("english", englishSchema);

export default English; 