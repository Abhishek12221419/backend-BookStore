import express from "express"
import { PORT, mongoDBURL } from "./config.js"  // This curly braces only used for named exports (e.g., export const PORT = ...).Like we did in config.js
import mongoose from "mongoose";
import Book from "./models/bookModel.js";
import bookRouter from "./routes/booksRoute.js";
// const cors = require("cors");  // You can write instead of import but in new format we write "type":"module" in package.json so that require is outdated
import cors from "cors";

const app = express();

// Middleware that Automatically read and parse any incoming request body that is in JSON format, and attach it to req.body.
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow All Origins with default of cors(*)
app.use(cors());
// Option 2: Allow Specific(Custom) Origins
// app.use(cors({

// }))

app.use("/books",bookRouter);

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log("App connected to mongoDB");
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
})
.catch((err) => {
    console.log(`${err} connecting to database`);
})