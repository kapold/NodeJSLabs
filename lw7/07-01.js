const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const errors = require("./helpers/errors");
const errorController = require("./global-controllers/errorController");
const pizzaRoutes = require("./routers/pizzaRouter")();
const weaponRoutes = require("./routers/weaponRouter")();
const turtleRoutes = require("./routers/turtleRouter")();
const turtleController = require("./controllers/turtleController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "turtle_" + req.body.turtleId + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

let app = express();

app.use(bodyParser.json({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/images", (req, res, next) => {
  const filePath = path.join(__dirname, "images", req.path);

  if (!fs.existsSync(filePath)) {
    res.status(404).send("Image not found");
  } else {
    next();
  }
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/upload", (req, res) => {
  res.sendFile(__dirname + "/upload.html");
});
app.post("/upload", upload.single("image"), async (req, res, next) => {
  turtleController.uploadTurtleImage(req, res, next);
});
app.use("/api/pizzas/", pizzaRoutes);
app.use("/api/weapons/", weaponRoutes);
app.use("/api/turtles/", turtleRoutes);
app.use((req, res, next) => {
  res.error(errors.resourseNotFound);
});

app.use(errorController);

app.listen(3000, () => console.log("Server running at port 3000"));
