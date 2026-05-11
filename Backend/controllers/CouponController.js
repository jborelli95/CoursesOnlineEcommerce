import models from "../models/index.js";

export default {
  config_all: async (req, res) => {
    try {
      const [coursesList, categoriesList] = await Promise.all([
        models.Course.find({ state: 2 }).select("_id title image category").populate("category", "_id title"),
        models.Category.find({ state: 1 }).select("_id title image"),
      ]);

      res.status(200).json({ courses_list: coursesList, categories_list: categoriesList });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error getting config" });
    }
  },

  register: async (req, res) => {
    try {
      if (!req.body.code) {
        return res.status(400).send({ message: "Coupon code is required" });
      }

      const existing = await models.Coupon.findOne({ code: req.body.code.toUpperCase().trim() });
      if (existing) {
        return res.status(200).send({ message: 403, message_text: "The coupon code already exists" });
      }

      const newCoupon = await models.Coupon.create(req.body);

      res.status(200).json({ coupon: newCoupon, message: "Coupon created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error creating coupon" });
    }
  },

  update: async (req, res) => {
    try {
      if (!req.body.code) {
        return res.status(400).send({ message: "Coupon code is required" });
      }

      const existing = await models.Coupon.findOne({
        code: req.body.code.toUpperCase().trim(),
        _id: { $ne: req.body._id },
      });
      if (existing) {
        return res.status(200).send({ message: 403, message_text: "The coupon code already exists" });
      }

      const updated = await models.Coupon.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .populate({ path: "courses", select: "_id title image" })
        .populate({ path: "categories", select: "_id title image" });

      res.status(200).json({ coupon: updated, message: "Coupon updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error updating coupon" });
    }
  },

  list: async (req, res) => {
    try {
      let search = req.query.search;

      let filter = {};
      if (search) filter.code = new RegExp(search, "i");

      const coupons = await models.Coupon.find(filter)
        .populate({ path: "courses", select: "_id title image" })
        .populate({ path: "categories", select: "_id title image" })
        .sort({ createdAt: -1 });

      res.status(200).json({ coupons });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error listing coupons" });
    }
  },

  remove: async (req, res) => {
    try {
      await models.Coupon.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error deleting coupon" });
    }
  },

  show: async (req, res) => {
    try {
      const coupon = await models.Coupon.findById(req.params.id)
        .populate({ path: "courses", select: "_id title image" })
        .populate({ path: "categories", select: "_id title image" });

      if (!coupon) {
        return res.status(404).send({ message: "Coupon not found" });
      }

      res.status(200).json({ coupon });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error getting coupon" });
    }
  },

  validate: async (req, res) => {
    try {
      const coupon = await models.Coupon.findOne({
        code: req.params.code.toUpperCase().trim(),
        state: 1,
      })
        .populate({ path: "courses", select: "_id title image" })
        .populate({ path: "categories", select: "_id title image" });

      if (!coupon) {
        return res.status(200).send({ message: 404, message_text: "Coupon not found or inactive" });
      }

      if (coupon.expiration_date && new Date() > coupon.expiration_date) {
        return res.status(200).send({ message: 400, message_text: "Coupon has expired" });
      }

      if (coupon.max_uses !== null && coupon.uses >= coupon.max_uses) {
        return res.status(200).send({ message: 400, message_text: "Coupon has reached its usage limit" });
      }

      res.status(200).json({ coupon, message: "Coupon is valid" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error validating coupon" });
    }
  },
};
