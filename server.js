var path = require("path");
var express = require("express");

const app = express(),
  DIST_DIR = path.join(__dirname, "dist");
  HTML_FILE = path.join(DIST_DIR, "index.html");

console.log("__dirname:", DIST_DIR);

app.use(express.static(DIST_DIR));
// Send index.html on every GET request
app.get("/*", (req, res) => {
  console.log("Request:", req.url);
  res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
