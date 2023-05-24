module.exports = {
  routes: [
    {
      method: "GET",
      path: "/categories",
      handler: "category.find",
      config: {
        policies: ["api::category.is-category"],
      },
    },
    {
      method: "POST",
      path: "/categories",
      handler: "category.create",
      config: {
        policies: ["global::is-authenticated"],
      },
    },
    {
      method: "PUT",
      path: "/categories/:id",
      handler: "category.update",
      config: {
        policies: ["global::is-authenticated"],
      },
    },
    {
      method: "DELETE",
      path: "/categories/:id",
      handler: "category.delete",
      config: {
        policies: ["global::is-authenticated"],
      },
    },
  ],
};
