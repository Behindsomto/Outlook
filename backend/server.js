// index.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/submit", (req, res) => {
  const { firstName, lastName } = req.body;
  console.log("Data received:", firstName, lastName);

  // Do something with data here (store, log, etc.)
  res.status(200).json({ message: "Data received!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
