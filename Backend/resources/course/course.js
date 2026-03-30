export default {
  api_resource_course: (course) => {
    return {
      _id: course._id,
      title: course.title,
      slug: course.slug,
      image: course.image
        ? process.env.URL_BACKEND + "/api/courses/image-course/" + course.image
        : null,
      state: course.state,
      category: {
        _id: course.category._id,
        title: course.category.title,
      },
      user: {
        _id: course.user._id,
        name: course.user.name,
        surname: course.user.surname,
      },
      sub_title: course.sub_title,
      description: course.description,
      vimeo_id: course.vimeo_id,
      level: course.level,
      language: course.language,
      price_usd: course.price_usd,
      requirements: JSON.parse(course.requirements),
      who_is_it_for: JSON.parse(course.who_is_it_for),
    };
  },
};
