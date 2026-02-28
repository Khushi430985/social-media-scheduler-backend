const supabase = require("../config/supabase");

exports.getDashboardStats = async (req, res) => {
  try {
    const { data: posts } = await supabase.from("posts").select("*");
    const { data: campaigns } = await supabase.from("campaigns").select("*");
    const { data: analytics } = await supabase.from("analytics").select("*");

    const totalLikes = analytics.reduce((sum, item) => sum + (item.likes || 0), 0);

    res.json({
      totalPosts: posts.length,
      totalCampaigns: campaigns.length,
      totalLikes
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};