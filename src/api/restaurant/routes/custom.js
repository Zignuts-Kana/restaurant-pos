module.exports ={
  routes:[
    {
      method: "POST",
      path: "/restaurants",
      handler: "restaurant.create",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "GET",
      path: "/restaurants",
      handler: "restaurant.find",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "GET",
      path: "/restaurants/:id",
      handler: "restaurant.findOne",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "PUT",
      path: "/restaurants/:id",
      handler: "restaurant.update",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "DELETE",
      path: "/restaurants/:id",
      handler: "restaurant.delete",
      config:{
        policies:['global::is-authenticated']
      }
    },
  ]
}