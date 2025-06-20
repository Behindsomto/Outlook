const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ Use the correct port for Render
const PORT = process.env.PORT || 3000;

// ✅ Allow frontend access (CORS)
app.use(
  cors({
    origin: "https://outlook-bbm64wfjo-behindsomtos-projects.vercel.app", // You can later restrict to your Vercel URL
  })
);

app.use(express.json());

// ✅ Connect to cloud MongoDB (Replace this with your real MongoDB URI)
mongoose
  .connect("mongodb://localhost:27017/userInputs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error(err));

// ✅ Schema + Model
const InfoSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});
const Info = mongoose.model("Info", InfoSchema);

// ✅ Route
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

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
