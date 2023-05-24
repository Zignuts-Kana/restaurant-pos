module.exports = async (policyContext, config, { strapi }) => {
  const { params, request } = policyContext;
  console.log("params", params);
  console.log("req", request.query);

  const fetchUser = async () => {
    return await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({ where: { id: policyContext.state.user.id }});
  };
  console.log(await fetchUser());

  const fetchRest = async (id) => {
    return await strapi.db
      .query("api::restaurant.restaurant")
      .findOne({ where: { id }});
  };

  if (policyContext.state.user) {
    console.log(policyContext.state.user.role.type);
    switch (policyContext.state.user.role.type) {
      case "customer":
        console.log(policyContext.state.route.path);
        switch (policyContext.state.route.path) {
          case "order.findOne":
          case "/orders":
          case "order.detail.findOne":
            console.log("here");
            request.query.filters = { ...request.query.filters,customer: policyContext.state.user.id };
            break;

          case "/categories":
            const user = await fetchUser();
            if (!user || !user.restaurants) {
              throw new PolicyError('Something went wrong')
            }
            const rest = await fetchRest(user.restaurants);
            console.log(rest);
            request.query.filters = { ...request.query.filters,category:{
              $in:[]
            } };
            break;

          default:
            break;
        }
        break;

      case "admin":
        console.log(policyContext.state.route.path);
        switch (policyContext.state.route.path) {
          case "/orders":
            if (!request.query.filters) {
              return false;
            }
            break;
          default:
            break;
        }
        break;
      case "worker":
        console.log(policyContext.state.route.path);
        break;
      case "manager":
        console.log(policyContext.state.route.path);
        break;
      default:
        return false;
    }
    return true;
  }

  return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
};
