const help = `
usage:
======
email-relay <options>

options:
========
"-H"
"--help"
    Print a help message describing all command-line options.

"-V"
"--version"
    Display the version.

"-D"
"--debug"
    Boolean flag to enable printing of debug logs
    for all messages received by the local SMTP server,
    and to disable their forwarding to the remote SMTP server.

"-lp" <number>
"--local-port" <number>
    Specify the port number that the local SMTP server listens on.
    [Default: 25]

"-h" <hostname>
"--remote-host" <hostname>
    Specify the hostname of the remote SMTP server.
    [Required]

"-rp" <number>
"--remote-port" <number>
    Specify the port number of the remote SMTP server.
    [Default: 25]

"-s"
"--remote-secure"
    Boolean flag to indicate that the remote SMTP server uses a secure (TLS or SSL) connection.
    [Default: false]

"-u" <username>
"--remote-username" <username>
    Specify the username for account authentication on the remote SMTP server.
    [Optional]

"-p" <password>
"--remote-password" <password>
    Specify the password for account authentication on the remote SMTP server.
    [Optional]

"-f" <email-address>
"--send-email-from" <email-address>
    Specify an email address to override the "from" sender
    for all messages received by the local SMTP server,
    before they are forwarded to the remote SMTP server.
    [Optional]

"-m" </path/to/file.js>
"--middleware" </path/to/file.js>
    Specifies the absolute filepath to a CommonJS module that exports a single function.
    This function can be used to conditionally modify any attribute
    of all messages received by the local SMTP server,
    before they are forwarded to the remote SMTP server.
    [Optional. Can be used more than once.]

"-LTT1"
"--legacy-tls-tweak-01"
    Boolean flag to enable the addition of a configuration tweak
    that may be required to support a secure connection to the remote SMTP server
    when either the local client (version of Node) or remote server only supports legacy protocols.
    This configuration tweak is:
      options.tls.ciphers = 'SSLv3'

"-LTT2"
"--legacy-tls-tweak-02"
    Boolean flag to enable the addition of a configuration tweak
    that may be required to support a secure connection to the remote SMTP server
    when either the local client (version of Node) or remote server only supports legacy protocols.
    This configuration tweak is:
      options.tls.minVersion = 'TLSv1'

"-LTT3"
"--legacy-tls-tweak-03"
    Boolean flag to enable the addition of a configuration tweak
    that may be required to support a secure connection to the remote SMTP server
    when either the local client (version of Node) or remote server only supports legacy protocols.
    This configuration tweak is:
      options.tls.rejectUnauthorized = false
`

module.exports = help
