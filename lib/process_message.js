const {simpleParser} = require('mailparser')

const process_message = function(argv_vals, transporter){
  return onData.bind(null, argv_vals, transporter)
}

const onData = function(argv_vals, transporter, stream, session, callback){
  simpleParser(stream, {}, function(error, parsed){
    if (error) {
      console.log('ERROR:', error.message)
      if (session.envelope && session.envelope.rcptTo && session.envelope.rcptTo.length) {
        console.log('Failed to send message to:', session.envelope.rcptTo)
      }
      callback(error)
    }
    else {
      const message = reformatMessage(parsed)

      if (argv_vals["--debug"]) {
        console.log('parsed mail object:', JSON.stringify(parsed, null, 2))
        console.log('message configuration object (before middleware):', JSON.stringify(message, null, 2))
      }

      if (argv_vals["--send-email-from"]) {
        message.from = argv_vals["--send-email-from"]
      }
      if (argv_vals["--middleware"] && Array.isArray(argv_vals["--middleware"]) && argv_vals["--middleware"].length) {
        for (let middleware of argv_vals["--middleware"]) {
          if (typeof middleware === 'function') {
            middleware(message)
          }
        }
      }

      if (argv_vals["--debug"]) {
        console.log('message configuration object (after middleware):', JSON.stringify(message, null, 2))

        // prevent sending the message through the remote SMTP server
        callback()
        return
      }

      transporter.sendMail(message, function(error, info){
        if (error) {
          console.log('ERROR:', error.message)
          if (session.envelope && session.envelope.rcptTo && session.envelope.rcptTo.length) {
            console.log('Failed to send message to:', session.envelope.rcptTo)
          }
          callback(error)
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
          callback()
        }
      })
    }
  })
}

// ---------------------------------------------------------
// from:
//   parsed mail object
//   https://nodemailer.com/extras/mailparser/#mail-object
// ---------------------------------------------------------
// to:
//   message configuration object
//   https://nodemailer.com/message/
// ---------------------------------------------------------
const reformatMessage = function(parsed){
  const message = {}

  for (let key of ['from', 'to', 'cc', 'bcc']) {
    if (parsed[key] && Array.isArray(parsed[key].value) && parsed[key].value.length) {
      message[key] = parsed[key].value
    }
  }

  for (let key of ['attachments']) {
    if (parsed[key] && Array.isArray(parsed[key]) && parsed[key].length) {
      message[key] = parsed[key]
    }
  }

  for (let key of ['subject', 'text', 'html']) {
    if (parsed[key]) {
      message[key] = parsed[key]
    }
  }

  return message
}

module.exports = {onData: process_message}
