export default {
  api_resource_courseSection: (courseSection) => {
    return {
      _id: courseSection._id,
      title: courseSection.title,
      state: courseSection.state,
      course: {
        _id: courseSection.course._id,
        title: courseSection.course.title,
      },
    };
  },
};
