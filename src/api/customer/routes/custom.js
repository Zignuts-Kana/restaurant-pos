module.exports = {
  routes: [
    {
      method: "POST",
      path: "/customers/verify",
      handler: "custom.verifyOtp",
    },
    {
      method: "PUT",
      path: "/customers/:id",
      handler: "customer.update",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "DELETE",
      path: "/customers/:id",
      handler: "customer.delete",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "GET",
      path: "/customers/:id",
      handler: "customer.find",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "GET",
      path: "/customers/:id",
      handler: "customer.findOne",
      config:{
        policies:['global::is-authenticated']
      }
    },
  ],
};