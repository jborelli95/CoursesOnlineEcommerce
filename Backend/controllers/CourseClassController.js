import models from "../models/index.js";

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

      const { title, courseSection, vimeo_id, time, description, state } = req.body;
      const newCourseClass = await models.CourseClass.create({ title, courseSection, vimeo_id, time, description, state });

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

      const filter = courseSection_id ? { courseSection: courseSection_id } : {};

      const courseClassesList = await models.CourseClass.find(filter).sort({ createdAt: -1 });

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

      const { title, courseSection, vimeo_id, time, description, state } = req.body;
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
  uploadVimeo: async(req, res) => {
    try {
      
    } catch (error) {
      
    }
  }
};
