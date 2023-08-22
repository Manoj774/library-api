const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the 'cors' middleware
const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON data
app.use(bodyParser.json());

// Enable CORS for all routes
// app.use(cors({ origin: '*' }));
app.use(cors({
  origin: 'http://localhost:3001', // Replace with your actual frontend URL
}));



// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/library_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import your models
const Author = require('./models/Author');
const Book = require('./models/Book');

// Define your routes here

app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});

// GET /books
app.get('/books', async (req, res) => {
    try {
      // Implement pagination logic if needed
      const books = await Book.find().populate('author');
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // GET /book/:id
  app.get('/book/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).populate('author');
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // GET /authors
  app.get('/authors', async (req, res) => {
    try {
      const authors = await Author.find();
      res.json(authors);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // GET /author/:id
  app.get('/author/:id', async (req, res) => {
    try {
      const author = await Author.findById(req.params.id);
      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }
      res.json(author);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // POST /author
  app.post('/author', async (req, res) => {
    try {
      const { first_name, last_name } = req.body;
      const author = new Author({ first_name, last_name });
      await author.save();
      res.status(201).json(author);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // POST /book
  app.post('/book', async (req, res) => {
    try {
      const { name, isbn, author } = req.body;
      const book = new Book({ name, isbn, author });
      await book.save();
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // PUT /author/:id
  app.put('/author/:id', async (req, res) => {
    try {
      const { first_name, last_name } = req.body;
      const author = await Author.findByIdAndUpdate(req.params.id, { first_name, last_name }, { new: true });
      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }
      res.json(author);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // PUT /book/:id
  app.put('/book/:id', async (req, res) => {
    try {
      const { name, isbn, author } = req.body;
      const book = await Book.findByIdAndUpdate(req.params.id, { name, isbn, author }, { new: true }).populate('author');
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

 
 