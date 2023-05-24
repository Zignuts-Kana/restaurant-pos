module.exports ={
  routes:[
    {
      method: "POST",
      path: "/order-details",
      handler: "order-detail.create",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "PUT",
      path: "/order-details/:id",
      handler: "order-detail.update",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "DELETE",
      path: "/order-details/:id",
      handler: "order-detail.delete",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "GET",
      path: "/order-details/:id",
      handler: "order-detail.findOne",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "GET",
      path: "/order-details",
      handler: "order-detail.find",
      config:{
        policies:['global::is-authenticated']
      }
    },
  ]
}