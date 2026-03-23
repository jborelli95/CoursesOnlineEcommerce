import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    title: {
      type: String,
      maxlength: 250,
      required: true,
    },
    image: {
      type: String,
      maxlength: 250,
      required: true,
    },
    state: {
      type: Number,
      maxlength: 1,
      default: 1, //1 - active, 2- inactive
    },
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
