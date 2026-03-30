export default {
  api_resource_category: (category) => {
    return {
      _id: category._id,
      title: category.title,
      image: category.image
        ? process.env.URL_BACKEND +
          "/api/categories/image-category/" +
          category.image
        : null,
      state: category.state,
    };
  },
};
