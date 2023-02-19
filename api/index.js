const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const ConvenRoute = require("./routes/conversation");
const MessageRoute = require("./routes/messages");
const postRoute = require("./routes/posts");
const router = express.Router();
const path = require("path"); 
const cors = require("cors")
dotenv.config();
mongoose.connect(
  process.env.MONGO_URL,
  () => {
    console.log("Connected to MongoDB");
  }
  );
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
app.use("/images", express.static(path.join(__dirname, "/public/images")));
//middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
// Date.now() + file.originalname;
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
app.post("/api/upload/profile", upload.single("files"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
 
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversation", ConvenRoute);
app.use("/api/message", MessageRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
