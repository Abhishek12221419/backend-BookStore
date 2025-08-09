import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        Title: {
            type: String,
            required: true
        },
        Author: {
            type: String,
            required: true
        },
        PublishYear: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model("Books", bookSchema);

export default Book;