const express = require("express");
const router = express.Router();
const { getPlatformInsights } = require("../controllers/analyticsController");

const {
  getAnalytics,
  updateAnalytics
} = require("../controllers/analyticsController");

router.get("/", getAnalytics);
router.put("/:id", updateAnalytics);
router.get("/platform-insights", getPlatformInsights);
module.exports = router;