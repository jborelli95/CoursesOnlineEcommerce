import mongoose, { Schema } from "mongoose";

const courseClassSchema = new Schema(
  {
    title: {
      type: String,
      maxlength: 250,
      required: true,
    },
    courseSection: {
      type: Schema.Types.ObjectId,
      ref: "CourseSection",
      required: true,
    },
    vimeo_id: { //Vimeo id of the video of the class
      type: String,
      required:false
    },
    time: { //Time of the video duration
      type: String,
      required:false
    },
    description: {
      type: String,
      required:true,
      maxlenght: 250,
    },
    state: {
      type: Number,
      maxlength: 1,
      default: 1, //1 - active, 2 - inactive
    },
  },
  {
    timestamps: true,
  },
);

const CourseClass = mongoose.model("CourseClass", courseClassSchema);

export default CourseClass;
