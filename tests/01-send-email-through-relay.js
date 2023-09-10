const nodemailer = require('nodemailer')
const config     = require('./config')

const transporter = nodemailer.createTransport({
  host: '127.0.0.1',
  port: config.smtpd["local-port"]
})

transporter.sendMail(config.message, function(error, info){
  if(error){
    console.log('ERROR:', error.message)
  }
  else {
    if (info.accepted && info.accepted.length) {
      console.log('Message accepted for delivery to:', info.accepted)
    }
    if (info.rejected && info.rejected.length) {
      console.log('Message rejected for delivery to:', info.rejected)
    }
    if (info.pending && info.pending.length) {
      console.log('Message rejected for delivery to:', info.pending)
    }
  }
})
