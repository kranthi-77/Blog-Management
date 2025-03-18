require("dotenv").config();
const express = require("express");
const connectDB = require("./utils/db");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
