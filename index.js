const express = require("express");
const { google } = require("googleapis");
const app = express();
require("dotenv").config();

app.get("/token", async (req, res) => {
  try {
    const jwtClient = new google.auth.JWT({
      email: process.env.CLIENT_EMAIL,
      key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/datastore"],
    });

    const tokens = await jwtClient.authorize();
    res.json({ access_token: tokens.access_token });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => console.log("Token server running"));
