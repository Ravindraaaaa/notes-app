import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },


    email: {
      type: String,
      required: [true, "please enter the email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email address",
      ],
      lowercase:true,
      unique:true
    },

    password:{
        type:String,
        required:[true,"please enter the password"],
        minlength:[6,"enter minimum 6 digit password"]
    }

  },
  {
    timestamps: true,
  }
);


const user = mongoose.model("user",UserSchema)

export default user