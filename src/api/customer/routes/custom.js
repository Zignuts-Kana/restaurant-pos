module.exports = {
  routes: [
    {
      method: "POST",
      path: "/customers/verify",
      handler: "custom.verifyOtp",
    },
  ],
};