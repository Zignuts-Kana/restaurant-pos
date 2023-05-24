module.exports ={
  routes:[
    {
      method: "GET",
      path: "/menu-items",
      handler: "menu-item.find",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "GET",
      path: "/menu-items/:id",
      handler: "menu-item.findOne",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "POST",
      path: "/menu-items",
      handler: "menu-item.create",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "PUT",
      path: "/menu-items/:id",
      handler: "menu-item.update",
      config:{
        policies:['global::is-authenticated']
      }
    },
    {
      method: "DELETE",
      path: "/menu-items/:id",
      handler: "menu-item.delete",
      config:{
        policies:['global::is-authenticated']
      }
    },
  ]
}