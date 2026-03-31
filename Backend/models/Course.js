import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      maxlength: 250,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    sub_title: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price_usd: {
      type: Number,
      required: true,
    },
    price_pesos:{
      type:Number,
      required:true
    },
    image: {
      type: String,
      maxlength: 250,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    vimeo_id: {
      type: String,
      required: false,
    },
    state: {
      type: Number,
      default: 1, //1- test course... 2- course public
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId, // User Instructor
      ref: "User",
      required: true,
    },
    level: {
      type: String,
      maxlength: 250,
      required: true,
    },
    language: {
      type: String,
      maxlength: 250,
      required: true,
    },
    requirements: {
      type: String, // ===> We can save as array of strings
      required: true,
    },
    who_is_it_for: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Course = mongoose.model('Course', courseSchema);

export default Course;