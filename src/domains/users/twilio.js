const sendSms = (phone, message) => {
    const client = require('twilio')(accountSid, authToken);
    client.messages
      .create({
         body: message,
         from: process.env.TWILIO_PHONE_NUMBER,
         to: phone
       })
      .then(message => console.log(message.sid));
  }
  
  module.exports = sendSms;