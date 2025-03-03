import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb+srv://nadeemsheriff18:nadeem18@database.qnufz.mongodb.net/EVSync?retryWrites=true&w=majority&appName=EVSync";

app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "EVSync",
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Rider Schema
const riderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  kmTraveled: { type: Number, default: 0 },
  charge: { type: Number, default: 100 },
});

const Rider = mongoose.model("Rider", riderSchema, "riders");

// Battery Request Schema
const batteryRequestSchema = new mongoose.Schema({
  username: { type: String, required: true },
  supply: { type: Number, required: true },
  cost: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const BatteryRequest = mongoose.model("BatteryRequest", batteryRequestSchema);

// Register Route
app.post("/register", async (req, res) => {
  const { name, email, password, age } = req.body;

  try {
    let existingRider = await Rider.findOne({ email });
    if (existingRider) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRider = new Rider({ name, email, password: hashedPassword, age });
    await newRider.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const rider = await Rider.findOne({ email });
    if (!rider) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, rider.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const username = email.split("@")[0];

    const token = jwt.sign(
      { id: rider._id, email: rider.email },
      process.env.JWT_SECRET || "defaultSecretKey",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, username, userId: rider._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Post a Battery Request
app.post("/request", async (req, res) => {
  console.log("🟡 Incoming request to /request");
  console.log("🔵 Received body:", req.body);

  try {
    const { username, supply, cost } = req.body;

    if (!username || !supply || !cost) {
      console.log("❌ Missing fields in request:", { username, supply, cost });
      return res.status(400).json({ message: "All fields (username, supply, cost) are required." });
    }

    const newRequest = new BatteryRequest({ username, supply, cost });

    console.log("💾 Saving request to MongoDB:", newRequest);
    await newRequest.save();

    console.log("✅ Request saved successfully:", newRequest);
    res.status(201).json({ message: "Request sent successfully", request: newRequest });
  } catch (error) {
    console.error("❌ Error saving request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



// Fetch all battery requests
app.get("/requests", async (req, res) => {
  try {
    const requests = await BatteryRequest.find({}, "username supply cost");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
