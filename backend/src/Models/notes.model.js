import mongoose from "mongoose";
import user from "./user.model.js";

const notesScema = new mongoose.Schema(
  {
    owner: {
       type:mongoose.Schema.Types.ObjectId,
       ref:user,
       required:true
    },

    title: {
      type: String,
      required: true,
    },

     subtitle: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    }

  },

  {
    timestamps: true,
  },

);

const notes =  mongoose.model("notes",notesScema)

export default notes
