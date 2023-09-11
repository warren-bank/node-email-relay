const mailparser   = require('mailparser')
const nodemailer   = require('nodemailer')
const {SMTPServer} = require('smtp-server')
const {onData}     = require('./process_message')

// -----------------------------------------------------------------------------

const getTransportOptions = function(argv_vals){
  const options = {
    host:   argv_vals["--remote-host"],
    port:   argv_vals["--remote-port"],
    secure: argv_vals["--remote-secure"]
  }

  if (argv_vals["--remote-username"] && argv_vals["--remote-password"]) {
    options.auth = {
      type: 'login',
      user: argv_vals["--remote-username"],
      pass: argv_vals["--remote-password"]
    }
  }

  if (argv_vals["--legacy-tls-tweak-01"] || argv_vals["--legacy-tls-tweak-02"] || argv_vals["--legacy-tls-tweak-03"]) {
    options.tls = {}

    if (argv_vals["--legacy-tls-tweak-01"]) {
      // https://github.com/nodemailer/nodemailer/issues/165#issuecomment-20733858
      options.tls.ciphers = 'SSLv3'
    }
    if (argv_vals["--legacy-tls-tweak-02"]) {
      // https://github.com/nodemailer/nodemailer#i-get-tls-errors
      options.tls.minVersion = 'TLSv1'
    }
    if (argv_vals["--legacy-tls-tweak-03"]) {
      // https://github.com/nodemailer/nodemailer#i-get-tls-errors
      options.tls.rejectUnauthorized = false
    }
  }

  return options
}

const getServerOptions = function(argv_vals, transporter){
  const options = {
    secure:           false,
    disabledCommands: ['AUTH', 'STARTTLS'],
    name:             'email-relay',
    banner:           'Connection accepted',
    onData:           onData(argv_vals, transporter)
  }

  return options
}

const process_cli = function(argv_vals){
  const transporter = nodemailer.createTransport(
    getTransportOptions(argv_vals)
  )

  const server = new SMTPServer(
    getServerOptions(argv_vals, transporter)
  )

  server.on('error', function(error){
    console.log('ERROR:', error.message)
  })

  server.listen(argv_vals["--local-port"], '0.0.0.0', function(){
    console.log('SMTP email relay is listening on port', argv_vals["--local-port"])
  })

  return server
}

// -----------------------------------------------------------------------------

module.exports = {mailparser, nodemailer, SMTPServer, start_server: process_cli}
