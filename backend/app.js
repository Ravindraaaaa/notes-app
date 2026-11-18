import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";

const app = express();

app.use(express.json()); // convert all body to understandable laguage of human
app.use(cookieParser()); // to save cookie of token it is middleware

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// rotes 
import authRoutes from "./src/Routes/auth.Routes.js";
import notesRoute from "./src/Routes/notes.Routes.js"


app.use('/api/auth/user',authRoutes);
app.use('/api/user',notesRoute);

export default app;
