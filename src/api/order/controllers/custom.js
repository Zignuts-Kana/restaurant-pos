const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async customCreate(ctx) {
    try {
      const userId = ctx.state.user.id;
      const { restaurant, items } = ctx.request.body.data;

      const newOrder = await strapi.db.query("api::order.order").create({
        data: {
          restaurant,
          customer: userId,
        },
      });
      const orderId = newOrder.id;
      let totalQuantity = 0;
      let totalAmount = 0;
      items.forEach(async (item) => {
        totalAmount = (
          parseFloat(totalAmount) +
          parseFloat(item.quantity) * parseFloat(item.price)
        ).toFixed(2);
        totalQuantity = totalQuantity + item.quantity;
        await strapi.db.query("api::order-detail.order-detail").create({
          data: {
            quantity: item.quantity,
            order: orderId,
            menu_item: item.menuItem,
            amount: (
              parseFloat(item.quantity) * parseFloat(item.price)
            ).toFixed(2),
          },
        });
      });
      const updateOrder = await strapi.db.query("api::order.order").update({
        where: { id: orderId },
        data: {
          quantity: totalQuantity,
          amount: totalAmount,
        },
      });
      return updateOrder;
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
}));
