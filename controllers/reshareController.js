const supabase = require("../config/supabase");

exports.resharePost = async (req, res) => {
  const { id } = req.params;

  try {
    // Get original post
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (postError) return res.status(400).json({ error: postError.message });

    // Create new post with new schedule time
    const newScheduledTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const { data, error } = await supabase
      .from("posts")
      .insert([{
        user_id: postData.user_id,
        campaign_id: postData.campaign_id,
        platform: postData.platform,
        content: postData.content + " (Reshared)",
        scheduled_time: newScheduledTime,
        status: "scheduled"
      }])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Post reshared successfully", data });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};