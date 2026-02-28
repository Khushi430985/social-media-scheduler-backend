const supabase = require("../config/supabase");

// CREATE TASK
const createTask = async (req, res) => {
  const { post_id, assigned_to, deadline } = req.body;

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        post_id,
        assigned_to,
        deadline,
        status: "pending",
      },
    ])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
};

// GET ALL TASKS
const getTasks = async (req, res) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("status", { ascending: true })
    .order("created_at", { ascending: false })
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// UPDATE TASK STATUS
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const { data, error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// DELETE TASK
const deleteTask = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "Task deleted successfully" });
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};