const supabase = require("../config/supabase");

// Create Post
exports.createPost = async (req, res) => {
  const { user_id, campaign_id, platform, content, scheduled_time, status } = req.body;

  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          user_id,
          campaign_id,
          platform,
          content,
          scheduled_time,
          status
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Create default analytics entry
    const postId = data[0].id;

    await supabase
      .from("analytics")
      .insert([
        {
          post_id: postId,
          likes: 0,
          comments: 0,
          shares: 0
        }
      ]);

    res.status(201).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Posts (Auto Publish Logic Added)
exports.getPosts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*");

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const now = new Date();

    // Auto publish scheduled posts
    for (let post of data) {
      if (
        post.status === "scheduled" &&
        post.scheduled_time &&
        new Date(post.scheduled_time) <= now
      ) {
        await supabase
          .from("posts")
          .update({ status: "published" })
          .eq("id", post.id);

        post.status = "published";
      }
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Post deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};