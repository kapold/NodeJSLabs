const express = require("express");
const cors = require("cors");
const db = require("./task1_db");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const filePath = path.join(__dirname, "index.html");

  fs.readFile(filePath, (err, content) => {
    res.setHeader("Content-Type", "text/html");
    return res.send(content);
  });
});

app.get("/api/db", async (req, res) => {
  const rows = await db.select();

  return res.json(rows);
});

app.post("/api/db", async (req, res) => {
  const newRow = await db.insert(req.body);

  return res.json(newRow);
});

app.put("/api/db/:id", async (req, res) => {
  const updatedRow = await db.update(parseInt(req.params.id), req.body);

  if (updatedRow) {
    return res.json(updatedRow);
  } else {
    return res.status(404).send("Not found");
  }
});

app.delete("/api/db/:id", async (req, res) => {
  const deletedRow = await db.delete(parseInt(req.params.id));

  if (deletedRow) {
    return res.json(deletedRow);
  } else {
    return res.status(404).send("Not found");
  }
});

app.listen(5000, () => console.log("Server started on port 5000"));
