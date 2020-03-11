import path from "path";
import express from "express";

const app = express(),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, "index.html");

// Send index.html on every GET request
app.get("/*", (req, res) => {
  res.sendFile(HTML_FILE);
});

app.use(express.static(DIST_DIR));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App X listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
