const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors()); // Enable CORS for all origins
app.get("/api/data", (req, res) => {
  res.json({ message: "This is a response from the server!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
