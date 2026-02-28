const supabase = require("../config/supabase");

// Get all analytics
exports.getAnalytics = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("analytics")
      .select("*");

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update analytics (simulate engagement)
exports.updateAnalytics = async (req, res) => {
  const { id } = req.params;
  const { likes, comments, shares } = req.body;

  try {
    const { data, error } = await supabase
      .from("analytics")
      .update({ likes, comments, shares })
      .eq("id", id)
      .select();

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPlatformInsights = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        platform,
        analytics (likes)
      `);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const platformTotals = {};

    data.forEach(post => {
      const platform = post.platform;
      const likes = post.analytics?.[0]?.likes || 0;

      if (!platformTotals[platform]) {
        platformTotals[platform] = 0;
      }

      platformTotals[platform] += likes;
    });

    res.json(platformTotals);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};