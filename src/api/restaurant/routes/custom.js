module.exports ={
  routes:[
    {
      method: "POST",
      path: "/restaurant",
      handler: "restaurant.create",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "PUT",
      path: "/restaurant/:id",
      handler: "restaurant.update",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "DELETE",
      path: "/restaurant/:id",
      handler: "restaurant.delete",
      config:{
        policies:['global::is-authenticated']
      }
    },
  ]
}