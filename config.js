import dotenv from "dotenv";
dotenv.config();
export const PORT = 8000;
export const mongoDBURL = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.d3eh4gl.mongodb.net/Book-Collection?retryWrites=true&w=majority&appName=cluster0`