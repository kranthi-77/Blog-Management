const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { addComment, updateComment, deleteComment } = require("../controllers/commentController");

const router = express.Router();
console.log(addComment)

// Add Comment
router.post("/:blogId", authMiddleware, addComment);

// Update Comment
router.put("/:commentId", authMiddleware, updateComment);

// Delete Comment
router.delete("/:commentId", authMiddleware, deleteComment)


module.exports = router;
