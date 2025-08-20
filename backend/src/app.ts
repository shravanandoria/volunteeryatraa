import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import opportunitiesRoutes from "./routes/opportunities";
import applicationRoutes from "./routes/applications";

dotenv.config();

// initializing cors for incomming connection
// express.json for parsing post requests
const app = express();
app.use(express.json());
app.use(cors());

// All routes come here
app.use("/api/opportunities", opportunitiesRoutes);
app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT || 8000;

// port is running on port 3000
app.listen(PORT, () => {
  console.log("App is started on port ", process.env.PORT);
});
