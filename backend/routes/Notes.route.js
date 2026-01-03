import express from "express";
import { createNote, getNotes, updateNote, deleteNote } from "../controllers/notes.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const notesrouter = express.Router();

notesrouter.post("/", authMiddleware, createNote);
notesrouter.get("/",  authMiddleware, getNotes);
notesrouter.put("/:id", authMiddleware, updateNote);
notesrouter.delete("/:id", authMiddleware, deleteNote);

export default notesrouter;
