"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", {
  async findOne(ctx) {

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    return { data, meta };
  },
  async update(ctx) {
    let response = await super.find(ctx);
    if (response.length) {
      response = await super.update(ctx);
    }
    return response;
  },
  async delete(ctx) {
    let response = await super.find(ctx);
    if (response.length) {
      response = await super.delete(ctx);
    }
    return response;
  },
});
