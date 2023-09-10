### [email-relay](https://github.com/warren-bank/node-email-relay)

SMTP proxy server with middleware capability.

#### Installation:

```bash
npm install --global @warren-bank/email-relay
```

#### Usage:

```bash
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
```

#### Middleware:

* each middleware function is synchronously processed in the order given on the command-line
* the same [message configuration object](https://nodemailer.com/message/) is passed as an input parameter to each middleware function
* this object is passed by reference, and its attributes can be directly modified

- - - -

#### Running Locally for Testing:

* [download](https://github.com/warren-bank/node-email-relay/archive/refs/heads/master.zip) and unzip into any local directory
* open terminal and change directory to where the repo snapshot was unzipped:
  ```bash
    cd /path/to/node-email-relay-master
  ```
* install dependencies:
  ```bash
    npm install
  ```
* start server in debug mode and pipe output to a log file:
  ```bash
    npm start -- -h "smtp.example.com" -D >debug.log 2>&1
  ```
* test server by sending a message to it:
  ```bash
    npm run "tests:01"
  ```
* inspect the debug log:
  ```bash
    cat debug.log
  ```

- - - -

#### Real-World Example for _Yahoo Mail_:

* [documentation](https://help.yahoo.com/kb/SLN4075.html) for connecting to remote SMTP server:
  |          |                           |
  |----------|---------------------------|
  | hostname | smtp.mail.yahoo.com       |
  | port     | 587                       |
  | secure   | true                      |
  | username | me@yahoo.com              |
  | password | my-generated-app-password |
* [account page](https://login.yahoo.com/myaccount/security/) to generate a _Yahoo Mail_ app password:
  - _Account Security_ &gt; _Generate app password_
* &lt;options&gt;:
  ```bash
    my_email='me@yahoo.com'
    my_password='0123456789abcdef'

    email-relay -h "smtp.mail.yahoo.com" -rp "587" -s -u "$my_email" -p "$my_password" -f "$my_email"
  ```

- - - -

#### Real-World Example for _GMX Mail_:

* [documentation](https://support.gmx.com/pop-imap/imap/server.html) for connecting to remote SMTP server:
  |          |                           |
  |----------|---------------------------|
  | hostname | mail.gmx.com              |
  | port     | 587                       |
  | secure   | true                      |
  | username | me@gmx.com                |
  | password | my-website-login-password |
* &lt;options&gt;:
  ```bash
    my_email='me@gmx.com'
    my_password='my-website-login-password'

    email-relay -h "mail.gmx.com" -rp "587" -s -u "$my_email" -p "$my_password" -f "$my_email"
  ```

- - - -

#### Real-World Example for _Zoho Mail_:

* [documentation](https://www.zoho.com/mail/help/zoho-smtp.html) for connecting to remote SMTP server:
  |          |                           |
  |----------|---------------------------|
  | hostname | smtp.zoho.com             |
  | port     | 587                       |
  | secure   | true                      |
  | username | me@zohomail.com           |
  | password | my-website-login-password |
* &lt;options&gt;:
  ```bash
    my_email='me@zohomail.com'
    my_password='my-website-login-password'

    email-relay -h "smtp.zoho.com" -rp "587" -s -u "$my_email" -p "$my_password" -f "$my_email"
  ```

- - - -

#### Credits:

[__Nodemailer__](https://nodemailer.com/) does absolutely _all_ of the heavy lifting required by this project:

* `smtp-server` creates the local SMTP server
  - [documentation](https://nodemailer.com/extras/smtp-server/)
  - [npm](https://www.npmjs.com/package/smtp-server)
  - [git repo](https://github.com/nodemailer/smtp-server)
* `mailparser` reads messages received by the local SMTP server and parses them to a [standardized data structure](https://nodemailer.com/extras/mailparser/#mail-object)
  - [documentation](https://nodemailer.com/extras/mailparser/)
  - [npm](https://www.npmjs.com/package/mailparser)
  - [git repo](https://github.com/nodemailer/mailparser)
* `nodemailer` sends messages received by the local SMTP server (and optionally modified by middleware) to the remote SMTP server
  - [documentation](https://nodemailer.com/)
  - [npm](https://www.npmjs.com/package/nodemailer)
  - [git repo](https://github.com/nodemailer/nodemailer)

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
