const twilio = require('twilio');

const accountSid = 'AC0e3fead79a3163c289a6fba68da83fb5';
const authToken = '5ac460fee3a6c3c3578e3c89ebe68899';

const client = new twilio.Twilio(accountSid, authToken);

const sendOTP = async (options) => {
  const otpOptions = {
    body: options.message,
    to: options.phone,
    from: process.env.TWILIO_PHONE,
  };
  // actually send the message
  await client.messages.create(otpOptions);
};

module.exports = sendOTP; 
