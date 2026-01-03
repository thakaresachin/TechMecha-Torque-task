import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [editId, setEditId] = useState(null);

  // Fetch Notes
  const getNotes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/notes",
        { withCredentials: true }
      );

      setNotes(res.data.data || []);
    } catch (err) {
      toast.error("Please login first ❌");
      navigate("/login");
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  // Create Note
  const addNote = async (e) => {
    e.preventDefault();

    if (!note.title || !note.content)
      return toast.error("All fields required");

    try {
      await axios.post(
        "http://localhost:5000/api/notes",
        note,
        { withCredentials: true }
      );

      toast.success("Note added ✅");
      setNote({ title: "", content: "" });
      getNotes();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error adding note");
    }
  };

  // Update Note
  const updateNote = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/notes/${editId}`,
        note,
        { withCredentials: true }
      );

      toast.success("Note updated ✅");
      setNote({ title: "", content: "" });
      setEditId(null);
      getNotes();
    } catch (err) {
      toast.error("Update failed ❌");
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/notes/${id}`,
        { withCredentials: true }
      );
      toast.success("Deleted 🗑");
      getNotes();
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster />

      <div className="max-w-3xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-6">
          My Notes
        </h2>

        {/* Add / Update Form */}
        <form
          onSubmit={editId ? updateNote : addNote}
          className="bg-white p-6 shadow rounded-lg mb-6 space-y-3"
        >
          <input
            type="text"
            placeholder="Title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <textarea
            placeholder="Write your note..."
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
            className="w-full border p-2 rounded"
            rows={3}
          />

          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editId ? "Update Note" : "Add Note"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setNote({ title: "", content: "" });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-3"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Notes List */}
        <div className="space-y-3">
          {notes?.length === 0 && (
            <p className="text-center text-gray-600">
              No notes yet ✍️
            </p>
          )}

          {notes?.map((n) => (
            <div
              key={n._id}
              className="bg-white shadow p-4 rounded flex justify-between"
            >
              <div>
                <h3 className="font-bold text-lg">{n.title}</h3>
                <p className="text-gray-700">{n.content}</p>
              </div>

              <div>
                <button
                  onClick={() => {
                    setEditId(n._id);
                    setNote({ title: n.title, content: n.content });
                  }}
                  className="text-blue-600 hover:text-blue-800 mr-3"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteNote(n._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Notes;
