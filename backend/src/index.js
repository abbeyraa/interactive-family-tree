import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import familyRoutes from "./routes/familyRoutes.js";

dotenv.config({ debug: true, override: true })

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB Connected: ", mongoose.connection.name);
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

app.use("/api/family", familyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
