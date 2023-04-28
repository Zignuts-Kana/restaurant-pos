const accountSid = "ACbc802029a12cc846d14a0d604be7ae4d"; // Your Account SID from www.twilio.com/console
const authToken = "2ddc689fb8438ba34a5ed4b81ad13c95"; // Your Auth Token from www.twilio.com/console
const client = require("twilio")(accountSid, authToken);
module.exports = {
  async beforeCreate(event) {
    event.params.data.otp = Math.floor(100000 + Math.random() * 900000)
  },
  async afterCreate(event){
    // Send email with nodemailer
    strapi.plugins["email"].services.email.send({
      to: event.result.email,
      from: "hello@zignuts.com", //e.g. single sender verification in SendGrid
      subject: "welcome email otp",
      html: `<p>hi ${event.result.firstName}, this is your otp ${event.result.otp}</p>`,
    });
    // Send OTP with twilio
    client.messages
      .create({
        body: `Hi
          ${event.result.firstName} 
          this is your OTP 
          ${event.result.otp}`,
        from: "+18883836867", // From a valid Twilio number
        to: "+919427836867",
      })
      .then((message) => console.log(message.sid));
  }
};