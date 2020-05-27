const express = require('express');
const wakeDyno = require('woke-dyno');

const port = 3001;
const DYNO_URL = 'https://yaiza-site-new.herokuapp.com';
const server = express();

server.listen(port, err => {
  if (err) throw err;
  wakeDyno(DYNO_URL).start();
});
