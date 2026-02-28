const express = require("express");
const router = express.Router();
const { deleteCampaign } = require("../controllers/campaignController");
const {
  createCampaign,
  getCampaigns
} = require("../controllers/campaignController");

router.post("/", createCampaign);
router.get("/", getCampaigns);
router.delete("/:id", deleteCampaign);

module.exports = router;