import models from "../models/index.js";
import token from "../services/token.js";
import fs from "fs";
import path from "path";
import resource from "../resources/index.js";

export default {
  register: async (req, res) => {
    try {
      let valid_category = await models.Category.findOne({
        title: req.body.title,
      });

      if (valid_category) {
        res.status(200).send({
          message: 403,
          message_text: "The category name already exist",
        });
      }

      if (req.files && req.files.image) {
        var img_path = req.files.image.path;
        console.log("Img path: " + img_path);
        var img_name = img_path.split("\\");
        console.log("Img name: " + img_name);
        var image_name = img_name[2];
        console.log("Avatar name: " + image_name);
        req.body.image = image_name;
      }

      let newCategory = await models.Category.create(req.body);

      res.status(200).json({
        category: resource.Category.api_resource_category(newCategory),
        message: "New category created",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "An error occurred while trying to register the category.",
      });
    }
  },
  update: async (req, res) => {
    try {
      let valid_category = await models.Category.findOne({
        title: req.body.title,
        _id: { $ne: req.body._id },
      });

      if (valid_category) {
        res.status(200).send({
          message: 403,
          message_text: "The category name already exist",
        });
      }

      if (req.files && req.files.image) {
        var img_path = req.files.image.path;
        console.log("Img path: " + img_path);
        var img_name = img_path.split("\\");
        console.log("Img name: " + img_name);
        var image_name = img_name[2];
        console.log("Avatar name: " + image_name);
        req.body.image = image_name;
      }

      let updatedCategory = await models.Category.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
      );

      res.status(200).json({
        category: resource.Category.api_resource_category(updatedCategory),
        message: "The category updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "An error occurred while trying to update the category.",
      });
    }
  },
  list: async (req, res) => {
    try {
      let search = req.query.search;

      let categoriesList = await models.Category.find({
        $or: [{ title: new RegExp(search, "i") }],
      }).sort({ createdAt: -1 });

      categoriesList = await categoriesList.map((category) => {
        return resource.Category.api_resource_category(category);
      });

      res.status(200).json({
        categories: categoriesList,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "An error occurred while trying to get the categories list.",
      });
    }
  },
  remove: async (req, res) => {
    try {
      const id = req.params["id"];
      let category = await models.Category.findByIdAndDelete({ _id: id });
      //We need vaalidate if the category belongs to an existed course. If its true we cant delete it
      res.status(200).json({
        message: "The category was successfully deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "An error occurred while trying to delete the category.",
      });
    }
  },

  getImage: async (req, res) => {
      try {
        var img = req.params["img"];
        if (!img) {
          res.status(500).send({
            message: "Error getting img from params",
          });
        } else {
          fs.stat("./uploads/categories/" + img, function (err) {
            if (!err) {
              let path_img = "./uploads/categories/" + img;
              res.status(200).sendFile(path.resolve(path_img));
            } else {
              let path_img = "./uploads/default.jpg";
              res.status(200).sendFile(path.resolve(path_img));
            }
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Error ocurred when try get an image",
        });
      }
    },
};
