const process_argv = require('@warren-bank/node-process-argv')

const argv_flags = {
  "--help":                   {bool:  true},
  "--version":                {bool:  true},
  "--debug":                  {bool:  true},

  "--local-port":             {num:  "int"},

  "--remote-host":            {},
  "--remote-port":            {num:  "int"},
  "--remote-secure":          {bool: true},
  "--remote-username":        {},
  "--remote-password":        {},

  "--send-email-from":        {},
  "--middleware":             {file: "module", many: true}
}

const argv_flag_aliases = {
  "--help":                   ["-H"],
  "--version":                ["-V"],
  "--debug":                  ["-D"],
  "--local-port":             ["-lp"],
  "--remote-host":            ["-h"],
  "--remote-port":            ["-rp"],
  "--remote-secure":          ["-s"],
  "--remote-username":        ["-u"],
  "--remote-password":        ["-p"],
  "--send-email-from":        ["-f"],
  "--middleware":             ["-m"]
}

let argv_vals = {}

try {
  argv_vals = process_argv(argv_flags, argv_flag_aliases)
}
catch(e) {
  console.log('ERROR: ' + e.message)
  process.exit(1)
}

if (argv_vals["--help"]) {
  const help = require('./help')
  console.log(help)
  process.exit(0)
}

if (argv_vals["--version"]) {
  const data = require('../../package.json')
  console.log(data.version)
  process.exit(0)
}

if (!argv_vals["--local-port"]) {
  argv_vals["--local-port"] = 25
}

if (!argv_vals["--remote-port"]) {
  argv_vals["--remote-port"] = 25
}

argv_vals["--remote-secure"] = !!argv_vals["--remote-secure"]

// validate that all required options are populated:
for (let key of ["--remote-host"]) {
  if (!argv_vals[key]) {
    console.log('ERROR: Required option is missing:', key)
    process.exit(1)
  }
}

module.exports = argv_vals
