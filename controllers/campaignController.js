const supabase = require("../config/supabase");

// Create Campaign
exports.createCampaign = async (req, res) => {
  const { user_id, name, color } = req.body;

  try {
    const { data, error } = await supabase
      .from("campaigns")
      .insert([{ user_id, name, color }])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Campaigns
exports.getCampaigns = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*");

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete Campaign
exports.deleteCampaign = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from("campaigns")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Campaign deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};