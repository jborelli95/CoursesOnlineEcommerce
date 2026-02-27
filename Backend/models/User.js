import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlenght: 250,
    },
    surname: {
      type: String,
      required: true,
      maxlenght: 250,
    },
    email: {
      type: String,
      required: true,
      maxlenght: 250,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      maxlenght: 250,
    },
    rol: {
      type: String,
      maxlenght: 30,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
      maxlenght: 30,
    },
    state: {
      type: Number,
      default: 1, //1 - activo, 2- inactivo
    },
    phone: {
      type: String,
      maxlenght: 50,
      required: false,
    },
    birthday: {
      type: String,
      maxlenght: 50,
      required: false,
    },
    isInstructor: {
      type: Number, //1 es instructor
      default: null,
      required: false,
    },
    profession: {
      type: String,
      maxlenght: 250,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
