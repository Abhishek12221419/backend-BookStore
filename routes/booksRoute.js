import express from "express";
import Book from "../models/bookModel.js";

const Router = express.Router();


Router.get("/mern",(req,res) => {
    console.log(req);
    return res.status(200).send("Welcome to the MERN Stack");
});

// Route for save a new Book
Router.post("", async (req, res) => {
    try{
        if(
            !req.body.Title ||
            !req.body.Author ||
            !req.body.PublishYear
        )
        {
            return res.status(500).send({
                message : "Send all required fields: Title, Author and publishYear"
            })
        }

        const newBook = {
            Title : req.body.Title,
            Author : req.body.Author,
            PublishYear : req.body.PublishYear
        }

        const Books = await Book.create(newBook);
        return res.status(201).send(Books);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({message: err.message})
    }
})

// Route to get all the books from Database
Router.get("" ,async (req,res) => {
    try {
        const books = await Book.find({});
        // return res.status(200).json(books);
        return res.status(200).json({  // Another way
            counts: books.length,  // So, here we get how many books is there in collection 
            data: books  // And data of books
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: err.message});
    }
})

// Route to get One book from Database
Router.get("/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);

        if(!book){
            return res.status(404).send({message: "Book Not Found"});
        }
        return res.status(200).json(book);
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: err.message});
    }
})

// Route for find Book and Update
Router.put("/:id", async (req,res) => {
    try {
        if(
            !req.body.Title ||
            !req.body.Author ||
            !req.body.PublishYear
        ){
            return res.status(400).send({
                message: "Send all required fields: Title, Author and PublishYear"
            })
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send({message: "Book not found"});
        }
        return res.status(200).send({message: "Book Updated Successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).send({message: err.message});
    }
})

// Route for delete a Book
Router.delete("/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({message: "Book not found"});
        }
        return res.status(200).send({message: "Book deleted successfully"});
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: err.message});
    }
})

export default Router;