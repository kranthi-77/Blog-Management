const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Assign logged-in user's ID as the author
    const newBlog = new Blog({
      title,
      content,
      author: req.user._id, // 👈 Automatically assigns userId as authorId
    });

    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find().populate("author", "username email");
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const getBlogsByAuthor = async (req, res) => {
    try {
        const authorId = req.params.authorId;
        const blogs = await Blog.find({ author: authorId }).populate("author", "username email");
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
  

// Delete Blog (Admin can delete any blog, User can delete only their own blog)
const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user._id; // Extract from JWT middleware
    const userRole = req.user.role; // User's role

    // Find the blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the user is an admin or the blog owner
    if (userRole === "admin" || blog.author.toString() === userId.toString()) {
      await Blog.findByIdAndDelete(blogId);
      return res.status(200).json({ message: "Blog deleted successfully" });
    } else {
      return res.status(403).json({ message: "You are not authorized to delete this blog" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Update Blog (Admin can update any blog, User can update only their own blog)
const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user._id; // Extract from JWT middleware
    const userRole = req.user.role; // User's role
    const { title, content } = req.body; // Updated fields

    // Find the blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the user is an admin or the blog owner
    if (userRole === "admin" || blog.author.toString() === userId.toString()) {
      blog.title = title || blog.title;
      blog.content = content || blog.content;
      await blog.save();
      return res.status(200).json({ message: "Blog updated successfully", blog });
    } else {
      return res.status(403).json({ message: "You are not authorized to update this blog" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};



  

module.exports = { createBlog,getAllBlogs,getBlogsByAuthor,deleteBlog,updateBlog }
