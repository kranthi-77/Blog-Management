const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

// ➤ Add Comment
const addComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    // Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const newComment = new Comment({
      content,
      author: userId,
      blog: blogId,
    });

    await newComment.save();
    res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// ➤ Update Comment
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // User can update only their own comments
    if (userRole === "admin" || comment.author.toString() === userId.toString()) {
      comment.content = content || comment.content;
      await comment.save();
      return res.status(200).json({ message: "Comment updated successfully", comment });
    } else {
      return res.status(403).json({ message: "You are not authorized to update this comment" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// ➤ Delete Comment (Admin can delete any, user can delete only their own)
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;
    const userRole = req.user.role;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (userRole === "admin" || comment.author.toString() === userId.toString()) {
      await Comment.findByIdAndDelete(commentId);
      return res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      return res.status(403).json({ message: "You are not authorized to delete this comment" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { addComment, updateComment, deleteComment }
