import models from "../models/index.js";
import { Vimeo } from "@vimeo/vimeo";
import { getVideoDurationInSeconds } from "get-video-duration";

const client_vimeo = new Vimeo(
  process.env.CLIENT_ID_VIMEO,
  process.env.CLIENT_SECRETS_VIMEO,
  process.env.TOKEN_VIMEO,
);

async function uploadVideoVimeo(videoFilePath, videoMetaData) {
  return new Promise((resolve, reject) => {
    client_vimeo.upload(
      videoFilePath,
      videoMetaData,
      function (url) {
        resolve({
          message: 200,
          value: url,
        });
      },
      function (bytesUploaded, bytesTotal) {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log("Uploading: " + percentage + "%");
      },
      function (error) {
        console.log("Error trying upload a video. Error: " + error);
        reject({
          message: 403,
          message_txt: "Error trying upload the video to vimeo",
        });
      },
    );
  });
}

function formatarDuracion(durationInSeconds) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export default {
  register: async (req, res) => {
    try {
      const existingClass = await models.CourseClass.findOne({
        title: req.body.title,
        courseSection: req.body.courseSection,
      });

      if (existingClass) {
        return res.status(409).json({
          message: "The title already exists in this section",
        });
      }

      const { title, courseSection, vimeo_id, time, description, state } =
        req.body;
      const newCourseClass = await models.CourseClass.create({
        title,
        courseSection,
        vimeo_id,
        time,
        description,
        state,
      });

      res.status(201).json({
        message: "Course class registered successfully",
        newCourseClass,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error trying to register a course class",
      });
    }
  },
  list: async (req, res) => {
    try {
      const courseSection_id = req.query.courseSection_id;

      const filter = courseSection_id
        ? { courseSection: courseSection_id }
        : {};

      let courseClassesList = await models.CourseClass.find(filter).sort({
        createdAt: -1,
      });

      courseClassesList = courseClassesList.map((value) => {
        value.vimeo_id = value.vimeo_id ? `https://player.vimeo.com/video/${value.vimeo_id}` : null;
        return value;
      });

      console.log(courseClassesList);

      res.status(200).json({
        message: "Course classes listed successfully",
        courseClassesList,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error trying to get course classes",
      });
    }
  },
  update: async (req, res) => {
    try {
      const duplicateClass = await models.CourseClass.findOne({
        title: req.body.title,
        courseSection: req.body.courseSection,
        _id: { $ne: req.body._id },
      });

      if (duplicateClass) {
        return res.status(409).json({
          message: "The title already exists in this section",
        });
      }

      const { title, courseSection, vimeo_id, time, description, state } =
        req.body;
      const updatedCourseClass = await models.CourseClass.findByIdAndUpdate(
        { _id: req.body._id },
        { title, courseSection, vimeo_id, time, description, state },
        { new: true },
      );

      res.status(200).json({
        message: "Course class updated successfully",
        updatedCourseClass,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error trying to update a course class",
      });
    }
  },
  remove: async (req, res) => {
    try {
      await models.CourseClass.findByIdAndDelete({ _id: req.params["id"] });

      res.status(200).json({
        message: "Course class deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error trying to delete a course class",
      });
    }
  },
  uploadVimeo: async (req, res) => {
    try {
      let pathFile = req.files.video.path;

      const duration = await getVideoDurationInSeconds(pathFile);
      const videoDuration = formatarDuracion(duration);

      let videoMetaData = {
        name: "Class video",
        description:
          "Testing video for test correct conection to vimeo api - Class video",
        privacy: {
          view: "anybody",
        },
      };

      const result = await uploadVideoVimeo(pathFile, videoMetaData);

      const array = result.value.split("/");
      const vimeo_id_result = array[2];

      await models.CourseClass.findByIdAndUpdate(
        { _id: req.body._id },
        { vimeo_id: vimeo_id_result, time: videoDuration },
      );

      res.status(200).json({
        message: "Video uploaded successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        Error_message: "An error ocurred trying upload a video",
      });
    }
  },
};
