import mongoose, { Schema } from "mongoose";

const courseSectionSchema = new Schema(
  {
    title: {
      type: String,
      maxlength: 250,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId, // Course
      ref: "Course",
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

const CourseSection = mongoose.model("CourseSection", courseSectionSchema);

export default CourseSection;
