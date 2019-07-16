#!/usr/bin/env node

const Sucko = require('../index.js');
const PORT = process.env.PORT || 4444;
const socketPort = process.env.socketPort;
const sucko = new Sucko({port: socketPort});
sucko.listen(PORT);