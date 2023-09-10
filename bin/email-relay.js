#! /usr/bin/env node

const argv_vals      = require('./email-relay/process_argv')
const {start_server} = require('../lib/process_cli')

const server = start_server(argv_vals)
