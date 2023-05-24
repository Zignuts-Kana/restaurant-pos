"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", {
  async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: "en" };
    console.log("jahsdgahjsgdhjsagdhjasgj ", ctx.query);
    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    // some more custom logic
    meta.date = Date.now();

    return { data, meta };
  },
});
