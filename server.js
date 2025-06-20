const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/userInputs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error(err));

// ✅ Create schema
const InfoSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

// ✅ Create model
const Info = mongoose.model("Info", InfoSchema);

// ✅ Save form data
app.post("/submit", async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const newInfo = new Info({ firstName, lastName });
    await newInfo.save();

    res.json({ message: `Saved ${firstName} ${lastName} to DB ✅` });
  } catch (err) {
    res.status(500).json({ message: "DB save error ❌", error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
