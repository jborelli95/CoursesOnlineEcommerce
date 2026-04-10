import models from "../models/index.js";
import fs from "fs";
import path from "path";
import resource from "../resources/index.js";
import { Vimeo } from "@vimeo/vimeo";
import "dotenv/config";

const client_vimeo = new Vimeo(
  process.env.CLIENT_ID_VIMEO,
  process.env.CLIENT_SECRETS_VIMEO,
  process.env.TOKEN_VIMEO,
);

async function uploadVideoVimeo(pathFile, videoMetaData) {
  return new Promise((resolve, reject) => {
    client_vimeo.upload(
      pathFile,
      videoMetaData,
      function (url) {
        resolve("The video was uploaded successfully. URL: " + url);
      },
      function (error) {
        reject("Error trying upload a video. Error: " + error);
      },
    );
  });
}

export default {
  register: async (req, res) => {
    try {
      const isValidCourse = await models.Course.findOne({
        title: req.body.title,
      });

      if (isValidCourse) {
        res.status(200).json({
          message: 403,
          message_txt: "The course title is already exist",
        });
      }

      let title = req.body.title;

      req.body.slug = title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

      console.log(req.body.slug);

      if (req.files.cover) {
        let img_path = req.files.cover.path;
        let name = img_path.split("\\");
        let img_name = name[2];
        req.body.image = img_name;
      }

      const newCourse = await models.Course.create(req.body);

      res.status(200).json({
        message: "Course registered successfully.",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error 500: Error in register course",
      });
    }
  },
  update: async (req, res) => {
    try {
      const isValidCourse = await models.Course.findOne({
        title: req.body.title,
        _id: { $ne: req.body._id },
      });

      if (isValidCourse) {
        res.status(200).json({
          message: 403,
          message_txt: "The course title is already exist",
        });
      }

      let title = req.body.title;

      req.body.slug = title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

      if (req.files.cover) {
        let img_path = req.files.cover.path;
        let name = img_path.split("\\");
        let img_name = name[2];
        req.body.image = img_name;
      }

      const updatedCourse = await models.Course.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
      );

      res.status(200).json({
        message: "Course updated successfully.",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error 500: Error in update course",
      });
    }
  },
  list: async (req, res) => {
    try {
      let search = req.query.search;

      let coursesList = await models.Course.find({
        $and: [{ title: new RegExp(search, "i") }],
      }).populate(["category", "user"]); // We need bring users and ccategory

      coursesList = coursesList.map((course) => {
        return resource.Course.api_resource_course(course);
      });

      res.status(200).json({
        courses_list: coursesList, // we need api resource
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error 500: Error in get list course",
      });
    }
  },
  config_all: async (req, res) => {
    try {
      let categoriesList = await models.Category.find({ state: 1 });

      let usersList = await models.User.find({ state: 1, role: "Instructor" });

      categoriesList = categoriesList.map((category) => {
        return {
          _id: category._id,
          title: category.title,
        };
      });

      usersList = usersList.map((user) => {
        return {
          _id: user._id,
          name: user.name,
          surname: user.surname,
        };
      });

      res.status(200).json({
        categories_list: categoriesList,
        users_list: usersList,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error 500: Error in getting config",
      });
    }
  },
  remove: async (req, res) => {
    try {
      //The idea is we cant delete courses with one sell realized...
      let course = await models.Course.findByIdAndDelete({
        _id: req.params.id,
      });

      res.status(200).send({
        message: "The course was deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error 500: Error in remove course",
      });
    }
  },
  getImage: async (req, res) => {
    try {
      let img = req.params["img"];
      if (!img) {
        res.status(500).send({
          message: "Error getting img from params",
        });
      } else {
        fs.stat("./uploads/courses/" + img, function (err) {
          if (!err) {
            let path_img = "./uploads/courses/" + img;
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
  getById: async (req, res) => {
    try {
      let course_id = req.params["id"];

      const course = await models.Course.findById(course_id);

      if (!course) {
        res.status(200).json({
          message: 403,
          message_txt: "Error in getting course by id",
        });
      }

      //console.log(course);

      res.status(200).json({
        course: resource.Course.api_resource_course(course),
        message: "Course getting successfuly",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in getting course by id",
      });
    }
  },
  uploadVimeo: async (req, res) => {
    try {
      let pathFile = req.files.video.path;
      let videoMetaData = {
        name: "Test video",
        description: "Testing video for test coreect conection to vimeo  api",
        privacy: {
          view: "anybody",
        },
      };
      const result = await uploadVideoVimeo(pathFile, videoMetaData);

      console.log(result);

      res.status(200).json({
        message: "The test was successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        Error_message: "An error ocurred trying upload a video",
      });
    }
  },
};
