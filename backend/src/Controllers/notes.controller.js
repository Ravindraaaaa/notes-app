import notes from "../Models/notes.model.js";
import user from "../Models/user.model.js";

const writeNotes = async (req, res) => {

  try {
    const userId = req.user._id; // 1. Get logged-in user ID

    const userFind = await user.findById(userId); // 2. Find user using ID

    if (!userFind) {
      return res.status(401).json({
        message: "please login first",
      });
    }

    const { title, subtitle, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "enter the title first",
      });
    }

    const newNote = await notes.create({
      // created note using notes model
      title: title,
      subtitle: subtitle,
      description: description,
      owner: userFind._id,
    });

    return res.status(201).json({
      message: "note created successfully",
      note: newNote,
    });
  } catch (error) {
    console.error("error to create notes");

    return res.status(500).json({
      message: "error to create notes",
      error: error.message,
    });
  }
};

const saveNotes = async (req, res) => {
  try {
    const userId = req.user._id;

    const userNotesFind = await notes.find({
      owner: userId
    });

    return res.status(200).json({
      message: "Notes fetched successfully",
      userNotes: userNotesFind
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch notes",
      error: error.message
    });
  }
};

export default { writeNotes,saveNotes };
