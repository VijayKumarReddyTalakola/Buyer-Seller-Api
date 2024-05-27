const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");
const { verifyToken } = require("./middleware/auth");

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/books", verifyToken, bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
