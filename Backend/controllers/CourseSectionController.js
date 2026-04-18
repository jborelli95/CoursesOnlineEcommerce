import models from "../models/index.js";
import resource from "../resources/index.js";

export default {
  register: async (req, res) => {
    try {
      if (
        await models.CourseSection.findOne({
          title: req.body.title,
          course: req.body.course,
        })
      ) {
        res.status(200).send({
          message: 403,
          message_txt: "The title already exist",
        });
      } else {
        const newCourseSection = await models.CourseSection.create(req.body);

        res.status(200).json({
          message: "Course section registered successfully",
          newCourseSection: newCourseSection,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error trying register a course section",
      });
    }
  },
  list: async (req, res) => {
    try {
      let course_id = req.query.course_id;
      let courseSectionsList = [];

      if (course_id) {
        //If course id exist find the course section by id...
        courseSectionsList = await models.CourseSection.find({
          course: course_id,
        }).sort({
          createdAt: -1,
        });
        //if not return all courses sections
      } else {
        courseSectionsList = await models.CourseSection.find().sort({
          createdAt: -1,
        });
      }

      res.status(200).json({
        message: "Course sections listed successfully",
        courseSectionsList: courseSectionsList,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error trying getting all courses section",
      });
    }
  },
  update: async (req, res) => {
    try {
      //Course 1
      //desarrolllo de backend id:123
      //Course 2
      //desarrolllo de backend id:456
      //Course 3
      //desarrolllo de backend id:789
      if (
        await models.CourseSection.findOne({
          title: req.body.title,
          course: req.body.course,
          //_id != req.body._id
          _id: { $ne: req.body._id },
        })
      ) {
        res.status(200).send({
          message: "The title already exist in this course",
        });
      }

      const editedCourseSection = await models.CourseSection.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true },
      );

      res.status(200).json({
        message: "Course section updated successfully",
        updatedCourseSection: editedCourseSection,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error trying updated a course section",
      });
    }
  },
  remove: async (req, res) => {
    try {
      let deletedCourseSection = await models.CourseSection.findByIdAndDelete({
        _id: req.params["id"],
      });

      res.status(200).json({
        message: "Course section deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error trying register a course section",
      });
    }
  },
};
