import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;
const MONGO_URI =
  "mongodb+srv://nadeemsheriff18:nadeem18@database.qnufz.mongodb.net/EVSync?retryWrites=true&w=majority&appName=EVSync";

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB (Explicitly use EVSync)
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "EVSync", // Ensures correct database usage
  })
  .then(() => console.log("✅ Connected to MongoDB (EVSync Database)"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process if connection fails
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

const Rider = mongoose.model("Rider", riderSchema, "riders"); // Explicit collection name

// Register Route
app.post("/register", async (req, res) => {
  const { name, email, password, age } = req.body;

  try {
    // Check if user already exists
    let existingRider = await Rider.findOne({ email });
    if (existingRider) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new rider
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
    if (!rider) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, rider.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: rider._id, email: rider.email },
      process.env.JWT_SECRET || "defaultSecretKey",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Protected Route Example
app.get("/profile", verifyToken, async (req, res) => {
  try {
    const rider = await Rider.findById(req.user.id).select("-password");
    res.json(rider);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Middleware for JWT Authentication
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "defaultSecretKey");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
}
const batteryRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Rider", required: true },
    supply: { type: Number, required: true },
    cost: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  });
  
  const BatteryRequest = mongoose.model("BatteryRequest", batteryRequestSchema);

  app.post("/request", async (req, res) => {
    try {
      console.log("Received request body:", req.body); // Debugging line
  
      const { supply, cost, userId } = req.body; // Accept userId from frontend
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const newRequest = new BatteryRequest({
        userId,
        supply,
        cost,
      });
  
      await newRequest.save();
      res.status(201).json({ message: "Request sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
  app.get("/requests", async (req, res) => {
    try {
      const requests = await BatteryRequest.find().populate("userId", "name email");
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
