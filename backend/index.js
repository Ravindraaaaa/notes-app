import connectDB from "./src/config/db.js"
import app from "./app.js";

//Envirmental veriable .env
import dotenv from "dotenv"
dotenv.config();

const PORT = process.env.PORT || 5000;

// database
connectDB()


app.listen(PORT,()=>{
    console.log(`Server started !! AT  http://localhost:${PORT}`);
});

