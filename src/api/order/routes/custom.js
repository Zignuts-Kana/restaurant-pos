module.exports = {
  routes: [
    {
      method: "POST",
      path: "/restaurant/order",
      handler: "custom.customCreate",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "GET",
      path: "/restaurant/orders",
      handler: "custom.customFind",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "GET",
      path: "/restaurant/customer/:id/orders",
      handler: "custom.customFindForRestaurant",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "PUT",
      path: "/restaurant/orders/:id",
      handler: "custom.customUpdate",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "GET",
      path: "/orders",
      handler: "order.find",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "GET",
      path: "/orders/:id",
      handler: "order.findOne",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "PUT",
      path: "/orders/:id",
      handler: "order.update",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "DELETE",
      path: "/orders/:id",
      handler: "order.delete",
      config:{
        policies:['global::is-authenticated']
      }
    },
  ],
};