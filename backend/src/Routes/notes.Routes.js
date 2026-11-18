import express from "express"
import notesController from "../Controllers/notes.controller.js";

const router = express.Router();

router.post("/edit-notes",notesController.writeNotes);
router.post("/get-notes",notesController.getNotes);

export default router