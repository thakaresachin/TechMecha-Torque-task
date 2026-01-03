import Note from "../models/notes.model.js";

// Create Note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content)
      return res.status(400).json({ message: "Title & content required" });

    const note = await Note.create({
      title,
      content,
      user: req.user.id,
    });

    return res.status(201).json({ message: "Note created", data: note });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get All Notes (User based)
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json({ data: notes });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Update Note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    let note = await Note.findOne({ _id: id, user: req.user.id });

    if (!note) return res.status(404).json({ message: "Note not found" });

    note = await Note.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({ message: "Note updated", data: note });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete Note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    return res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
