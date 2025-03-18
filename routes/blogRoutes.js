const express = require("express");
const authMiddleware  = require("../middleware/authMiddleware");

const router = express.Router();

// Create Blog
const { getAllBlogs, getBlogsByAuthor, deleteBlog, updateBlog, createBlog } = require("../controllers/blogController");


// Protected route: Only logged-in users can create blogs
router.post("/create", authMiddleware, createBlog);

// Get All Blogs
router.get('/getBlogs',authMiddleware, getAllBlogs)

//get blogs by author Id
router.get("/author/:authorId",authMiddleware, getBlogsByAuthor);

router.delete("/:blogId", authMiddleware, deleteBlog);

router.put("/:blogId", authMiddleware, updateBlog);


module.exports = router;
