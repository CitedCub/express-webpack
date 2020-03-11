import path from "path";
import fs from "fs";
import express from "express";

import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "./src/components/App";

const app = express();

app.use("/public", express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res) => {
  // Render component html to a string
  const component = ReactDOMServer.renderToString(<App name="Server" />);

  // Read index.html file, insert component html string and send to client
  fs.readFile(
    path.resolve("./dist/index.html"),
    "UTF-8",
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Some error happened");
      }
      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${component}</div>`
        )
      );
    }
  );
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
