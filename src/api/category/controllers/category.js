'use strict';

/**
 * category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category.category',({strapi})=>({
  async findOne(ctx) {
    let response = await super.find(ctx);
    if (response.length) {
      response = response[0]
    }
    return response;
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
}));
