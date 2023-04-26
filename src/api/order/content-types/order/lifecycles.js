module.exports = {
  // async afterCreate(event) {
  //   const orderId = event.result.id;
  //   const items = event.params.data.items;
  //   let totalQuantity = 0;
  //   let totalAmount = 0;
  //   try {
  //     items.forEach(async (item) => {
  //       totalAmount = (
  //         parseFloat(totalAmount) +
  //         parseFloat(item.quantity) * parseFloat(item.price)
  //       ).toFixed(2);
  //       totalQuantity = totalQuantity + item.quantity;
  //       console.log({
  //         quantity: item.quantity,
  //         order: orderId,
  //         menuItem: item.menuItem,
  //         amount: (parseFloat(item.quantity) * parseFloat(item.price)).toFixed(
  //           2
  //         ),
  //       });
  //       await strapi.db
  //         .query("api::order-detail.order-detail")
  //         .create({
  //           data: {
  //             quantity: item.quantity,
  //             order: orderId,
  //             menu_item: item.menuItem,
  //             amount: (
  //               parseFloat(item.quantity) * parseFloat(item.price)
  //             ).toFixed(2),
  //           },
  //         })
  //         .catch((e) => console.log(e));
  //     });
  //     console.log({
  //       quantity: totalQuantity,
  //       amount: totalAmount,
  //     });
  //     await strapi.db
  //       .query("api::order.order")
  //       .update({
  //         where: { id: orderId },
  //         data: {
  //           quantity: totalQuantity,
  //           amount: totalAmount,
  //         },
  //       })
  //       .catch((e) => console.log(e));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};
