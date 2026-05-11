import models from "../models/index.js";
import { Vimeo } from "@vimeo/vimeo";
import { getVideoDurationInSeconds } from "get-video-duration";
import fs from "fs";
import path from "path";

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

export default {
  upload: async(req, res) => {
    try {
      const file = req.files?.file;
      const class_id = req.body?.class_id;

      if (!file || !class_id) {
        return res.status(400).json({ message: 'File and class_id are required' });
      }

      const courseClass = await models.CourseClass.findById(class_id);
      if (!courseClass) {
        return res.status(404).json({ message: 'Class not found' });
      }

      const filename = path.basename(file.path);
      const file_url = `${process.env.URL_BACKEND}/api/course/class/file/get/${filename}`;

      const newFile = await models.CourseClassFile.create({
        file: file.originalFilename || filename,
        file_url,
        class: class_id,
        size: file.size,
      });

      res.status(200).json({
        message: 'File uploaded successfully',
        file: newFile,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error uploading the file'
      })
    }
  },
  list: async(req, res) => {
    try {
      const { class_id } = req.params;
      const files = await models.CourseClassFile.find({ class: class_id }).sort({ createdAt: -1 });
      res.status(200).json({ files });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error fetching files' });
    }
  },
  delete: async(req, res) => {
    try {
      const { file_id } = req.params;
      const file = await models.CourseClassFile.findByIdAndDelete(file_id);
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }
      const filePath = path.resolve('./uploads/courses/classes/files/' + path.basename(file.file_url));
      fs.unlink(filePath, (err) => {
        if (err) console.log('Could not delete physical file:', err.message);
      });
      res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error deleting the file' });
    }
  },
  get_file_class: async(req, res) => {
    try {
      let file = req.params['file'];
      if(!file){
        res.status(500).json({
          message: 'An error ocurred',
        })
      }else{
        fs.stat('./uploads/courses/classes/files/'+ file, function(err){
          if (!err) {
            res.status(200).sendFile(path.resolve('./uploads/courses/classes/files/' + file));
          } else {
            res.status(200).json({
              message: 'Error uploading the file'
            })
          }
        })
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error: An error ocurred trying getting the file'
      })
    }
  }
};
