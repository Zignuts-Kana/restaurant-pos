module.exports = {
  routes: [
    {
      method: "POST",
      path: "/restaurant/order",
      handler: "custom.customCreate",
    },
  ],
};