const csv = require("csv-parser");
const fs = require("fs");
const prisma = require("../prisma");

const Upload = async (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        await prisma.book.createMany({
          data: results.map((book) => ({
            title: book.title,
            author: book.author,
            price: parseFloat(book.price),
            sellerId: req.user.id,
          })),
        });
        res.status(200).json({ message: "Books uploaded successfully" });
      } catch (error) {
        res.status(400).json({ message: "Error uploading books", error });
      }
    });
};

const getAllBooks = async (req, res) => {
  const books = await prisma.book.findMany();
  return res.status(200).json(books);
};

const getBookDetails = async (req, res) => {
  const book = await prisma.book.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!book) return res.status(404).json({ message: "Book not found" });
  return res.status(200).json(book);
};

const UpdateBook = async (req, res) => {
  const { title, author, price } = req.body;
  try {
    const book = await prisma.book.update({
      where: { id: parseInt(req.params.id), sellerId: req.user.id },
      data: { title, author, price },
    });
    return res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: "Error updating book", error });
  }
};

const DeleteBook = async (req, res) => {
  try {
    await prisma.book.delete({
      where: { id: parseInt(req.params.id), sellerId: req.user.id },
    });
    return res.status(200).json({ message: "Book Deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting book", error });
  }
};

module.exports = {
  Upload,
  getAllBooks,
  getBookDetails,
  UpdateBook,
  DeleteBook,
};
