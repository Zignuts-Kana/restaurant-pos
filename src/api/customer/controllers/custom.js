const { createCoreController } = require("@strapi/strapi").factories;
const bcrypt = require("bcrypt");
module.exports = createCoreController(
  "api::customer.customer",
  ({ strapi }) => ({
    // Verify customer otp
    async verifyOtp(ctx) {
      console.log(ctx.request.body.data);
      // Get request body data
      const { email, phoneNumber, otp } = ctx.request.body.data;
      let where = {};
      if (email) {
        where.email = email;
      }
      if (phoneNumber) {
        where.phoneNumber = phoneNumber;
      }
      // check if customer exists or not
      let existedCustomer = await strapi.db
        .query("api::customer.customer")
        .findMany({
          where: where,
          orderBy: { createdAt: "desc" },
          limit: 1,
        });
      existedCustomer = existedCustomer[0];
      if (!existedCustomer) {
        return (ctx.status = 400), (ctx.body = "Customer is not registered!");
      }
      if (existedCustomer.otp !== otp) {
        return (ctx.status = 403), (ctx.body = "Incorrect OTP!");
      }

      const oldCustomer = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({ where: { email, phoneNumber } });
      let newCustomer;
      if (!oldCustomer) {
        const password = await bcrypt.hash("123456", 10);
        newCustomer = await strapi.db
          .query("plugin::users-permissions.user")
          .create({
            data: {
              email: existedCustomer.email,
              username: `${existedCustomer.firstName} ${existedCustomer.lastName}`,
              phoneNumber: existedCustomer.phoneNumber,
              password,
              role: 6,
            },
          });
      }
      //generate jwt token
      existedCustomer.token = strapi.plugins[
        "users-permissions"
      ].services.jwt.issue({
        id: newCustomer ? newCustomer.id : oldCustomer.id,
        role: 6,
      });
      // Update customer jwt token
      await strapi.db.query("plugin::users-permissions.user").update({
        where: { id: oldCustomer ? oldCustomer.id : newCustomer.id },
        data: {
          authToken: existedCustomer.token,
        },
      });
      return { token: existedCustomer.token };
    },
  })
);
