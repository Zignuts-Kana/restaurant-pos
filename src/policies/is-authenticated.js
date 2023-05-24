const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;
const qs = require("qs");

module.exports = async (policyContext, config, { strapi }) => {
  if (!policyContext.state.user) {
    throw new PolicyError("Token error!");
  }
  let { params, request } = policyContext;
  console.log("params", params);
  console.log("req", request.query);

  const fetchUser = async () => {
    return await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({ where: { id: policyContext.state.user.id }, populate: true });
  };

  const fetchRest = async (id) => {
    return await strapi.db
      .query("api::restaurant.restaurant")
      .findOne({ where: { id }, populate: true });
  };

  if (policyContext.state.user) {
    console.log(policyContext.state.user.role.type);
    switch (policyContext.state.user.role.type) {
      case "authenticated":
        return true;
        break;
      case "customer":
        console.log(policyContext.state.route.path);
        switch (policyContext.state.route.path) {
          case "/orders":
          case "/orders/:id":
            {
              const user = await fetchUser();
              if (!user || !user.restaurants) {
                throw new PolicyError("Data not found for you!");
              }
              if (params.id) {
                request.query.filters = {
                  ...request.query.filters,
                  customer: policyContext.state.user.id,
                  id: params.id,
                };
                policyContext.state.route.handler = `${policyContext.state.route.handler.replace(
                  "findOne",
                  "find"
                )}`;
                params = {};
              } else {
                request.query.filters = {
                  ...request.query.filters,
                  customer: policyContext.state.user.id,
                };
              }
            }
            break;
          default:
            return true
            break;
        }
        break;

      case "admin":
      case "worker":
      case "manager":
        {
          console.log(policyContext.state.route.path);
          switch (policyContext.state.route.path) {
            case "/orders":
            case "/orders/:id":
              {
                const user = await fetchUser();
                if (!user || !user.restaurants) {
                  throw new PolicyError("Data not found for you!");
                }
                if (params.id) {
                  request.query.filters = {
                    ...request.query.filters,
                    restaurant: { id: user.restaurants[0].id },
                    id: params.id,
                  };
                  policyContext.state.route.handler = `${policyContext.state.route.handler.replace(
                    "findOne",
                    "find"
                  )}`;
                  params = {};
                } else {
                  request.query.filters = {
                    ...request.query.filters,
                    restaurant: { id: user.restaurants[0].id },
                  };
                }
              }
              break;

            case "/restaurants":
            case "/restaurants/:id":
              {
                const user = await fetchUser();
                if (!user || !user.restaurants) {
                  throw new PolicyError("Data not found for you!");
                }
                console.log(request.query.filters.id);
                if (
                  (params.id &&
                    parseInt(params.id) !== user.restaurants[0].id) ||
                  (request.query.filters.id &&
                    parseInt(request.query.filters.id) !==
                      user.restaurants[0].id)
                ) {
                  request.query.filters = {
                    ...request.query.filters,
                    id: 0,
                  };
                  policyContext.state.route.handler = `${policyContext.state.route.handler.replace(
                    "findOne",
                    "find"
                  )}`;
                  params = {};
                } else {
                  request.query.filters = {
                    ...request.query.filters,
                    id: user.restaurants[0].id,
                  };
                }
              }
              break;

            case "/categories":
            case "/categories/:id":
              {
                const user = await fetchUser();
                if (!user || !user.restaurants) {
                  throw new PolicyError("Data not found for you!");
                }

                if (params.id) {
                  request.query.filters = {
                    ...request.query.filters,
                    restaurant: user.restaurants[0].id,
                    id: params.id,
                  };
                  policyContext.state.route.handler = `${policyContext.state.route.handler.replace(
                    "findOne",
                    "find"
                  )}`;
                  params = {};
                } else {
                  request.query.filters = {
                    ...request.query.filters,
                    restaurant: user.restaurants[0].id,
                  };
                }
                console.log(request.query);
                // if (params.id) {
                //   const rest = await fetchRest(user.restaurants[0].id);
                //   const inArray = rest.categories.map((category) => {
                //     return { id: category.id };
                //   });
                //   if (!params.id.includes(inArray)) {
                //     return false;
                //   }
                // }
              }
              break;

            case "/menu-items":
            case "/menu-items/:id":
              {
                const user = await fetchUser();
                if (!user || !user.restaurants) {
                  throw new PolicyError("Data not found for you!");
                }
                const rest = await fetchRest(user.restaurants[0].id);
                const inArray = rest.categories.map((category) => {
                  return { id: category.id };
                });

                if (params.id) {
                  request.query.filters = {
                    ...request.query.filters,
                    category: {
                      $or: inArray,
                    },
                    id: params.id,
                  };
                  policyContext.state.route.handler = `${policyContext.state.route.handler.replace(
                    "findOne",
                    "find"
                  )}`;
                  params = {};
                } else {
                  request.query.filters = {
                    ...request.query.filters,
                    category: {
                      $or: inArray,
                    },
                  };
                }
              }
              break;
            default:
              return true
              break;
          }
        }
        break;
      default:
        return true;
        break;
    }
    return true;
  }

  return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
};
