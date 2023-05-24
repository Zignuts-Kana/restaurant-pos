const createCoreController =
  require("@strapi/strapi").factories["createCoreController"];
module.exports = createCoreController("api::order.order", ({ strapi: s }) => ({
  async customCreate(a) {
    try {
      var r = a.state.user.id,
        { restaurant: o, items: d } = a.request.body.data;
      const u = (
        await s.db
          .query("api::order.order")
          .create({ data: { restaurant: o, customer: r } })
      ).id;
      let e = 0,
        t = 0;
      return (
        d.forEach(async (r) => {
          (t = (
            parseFloat(t) +
            parseFloat(r.quantity) * parseFloat(r.price)
          ).toFixed(2)),
            (e += r.quantity),
            await s.db
              .query("api::order-detail.order-detail")
              .create({
                data: {
                  quantity: r.quantity,
                  order: u,
                  menu_item: r.menuItem,
                  amount: (
                    parseFloat(r.quantity) * parseFloat(r.price)
                  ).toFixed(2),
                },
              });
        }),
        await s.db
          .query("api::order.order")
          .update({ where: { id: u }, data: { quantity: e, amount: t } })
      );
    } catch (r) {
      return a.badRequest(r);
    }
  },
  async customFind(e) {
    try {
      var r = e.state.user.id;
      return await s.db
        .query("api::order.order")
        .findMany({ where: { customer: r } });
    } catch (r) {
      return e.badRequest(r);
    }
  },
  async customFindForRestaurant(e) {
    try {
      var r = e.request.params.id;
      return await s.db
        .query("api::order.order")
        .findMany({ where: { customer: r }, populate: !0 });
    } catch (r) {
      return e.badRequest(r);
    }
  },
  async customUpdate(e) {
    try {
      var r = e.state.user.id,
        t = e.request.params.id,
        a = e.request.body.data,
        o = await s.db
          .query("api::order.order")
          .update({ where: { id: t, customer: r }, data: a });
      return o ? o : e.badRequest(error);
    } catch (r) {
      return e.badRequest(r);
    }
  },
}));
("use strict");
const createCoreController =
  require("@strapi/strapi").factories["createCoreController"];
module.exports = createCoreController("api::order.order");
