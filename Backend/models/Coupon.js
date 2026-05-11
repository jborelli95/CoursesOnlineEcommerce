import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      maxlength: 50,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    discount_type: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "percentage",
    },
    expiration_date: {
      type: Date,
      default: null,
    },
    max_uses: {
      type: Number,
      default: null, // null = unlimited
    },
    uses: {
      type: Number,
      default: 0,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    state: {
      type: Number,
      default: 1, // 1 - active, 2 - inactive
    },
  },
  {
    timestamps: true,
  },
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
