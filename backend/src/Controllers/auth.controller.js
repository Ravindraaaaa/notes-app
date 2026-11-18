import user from "../Models/user.model.js";
import bcrypt from "bcryptjs"; // used for hash password
import jwt from "jsonwebtoken"; // for save token

const ragisterUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  const isUserAlredyExists = await user.findOne({
    email,
  });

  if (isUserAlredyExists) {
    return res.status(400).json({
      message: "user alredy exists with this email",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const createUser = await user.create({
    name: fullName,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: createUser._id,
    },
    process.env.JWT_URL,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User created successfully. !",
    createUser: {
      _id: createUser._id,
      fullName: createUser.name,
      email: createUser.email,
    },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const userExits = await user.findOne({
    email
  });

  if (!userExits) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password,userExits.password)

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: userExits._id,
    },
    process.env.JWT_URL,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User login successfully...",
    userExits: {
      _id: userExits._id,
      fullName:userExits.name,
      email:userExits.email,
    },
  })

};

const logoutUser = async (req,res) =>{
  res.clearCookie("token")
  res.status(200).json({
    message:"User logout successfull"
  })
}


export default { ragisterUser , loginUser , logoutUser};


