const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  getAllBooks,
  getBookDetails,
  Upload,
  UpdateBook,
  DeleteBook,
} = require("../controllers/book");
const { verifyRole } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(getAllBooks);
router.route("/upload").post(verifyRole, upload.single("file"), Upload);
router
  .route("/:id")
  .get(getBookDetails)
  .put(verifyRole, UpdateBook)
  .delete(verifyRole, DeleteBook);

module.exports = router;
