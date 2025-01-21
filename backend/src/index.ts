import express from "express";
import dotenv from "dotenv";
import db from "./database";
import authRouter from "./routes/auth.route";
import path from "path";
import fs from "fs";
import cors from "cors";
import babysitterRouter from "./routes/babysitter.route";
import multer from "multer";
dotenv.config();
const app = express();
const imagesDir = path.join(__dirname, "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir); // Save in the specified directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.png`); // Append .png extension
  },
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/auth", authRouter);
app.use("/babysitter", babysitterRouter);

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }
  const fullUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  res.status(201).json({
    data: fullUrl,
    status: 201,
    error: null,
    message: "image uploaded successfully",
  });
});
app.listen(8080, async function onInit() {
  console.log("Listening on port 8080, connecting to db..");
  await db;
  console.log("Connected to mongo db");
});
