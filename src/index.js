"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  // bootstrap(/*{ strapi }*/) {},
  bootstrap(/*{ strapi }*/) {
    // strapi.db
    //   .query("api::category.category")
    //   .create({ data: { name: "this", order: 4 } });
    // strapi.db.lifecycles.subscribe({
    //   models: ["plugin::users-permissions.user"],
    //   async beforeUpdate(event) {
    //     // console.log(event.params);
    //     event.params.data.createdAt = new Date(Date.now()).getTime().toString();
    //     event.params.data.updatedAt = new Date(Date.now()).getTime().toString();
    //   },
    //   async afterCreate(event) {
    //     console.log(event.result);
    //   },
    // });
  },
};
