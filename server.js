"use strict";

const express = require("express");
const http = require("http");
const bodyParser = require('body-parser');
const juice = require('juice');

if (process.env.SENTRY_DSN) {
  console.log('Initiating sentry');
  const Sentry = require("@sentry/node");
  Sentry.init({
    dsn: process.env.SENTRY_DSN
  });
}

const app = express()
app.use(bodyParser.text());

app.post("/inline-css", (req, res) => {
  let result = "";
  try {
    result = juice(req.body);
  } 
  catch (e) {
    if (Sentry) { 
      Sentry.captureException(e); 
    }
    console.log(e)
  }
  res.set('Content-Type', 'text/html');
  res.send(result)
});

app.get("/ht", (req, res) => {
  res.json({ status: "OK" });
});

const httpServer = http.Server(app);
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => console.log(`Client Listening on ${PORT}`));

