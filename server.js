const postRoutes = require("./routes/postRoutes");
const express = require("express");
const cors = require("cors");
const analyticsRoutes = require("./routes/analyticsRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reshareRoutes = require("./routes/reshareRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

require("dotenv").config();

const supabase = require("./config/supabase");
const campaignRoutes = require("./routes/campaignRoutes"); // 👈 ADD THIS

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

// Test DB
app.get("/test-db", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: "Database connected", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  CONNECT CAMPAIGN ROUTES
app.use("/api/campaigns", campaignRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reshare", reshareRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});