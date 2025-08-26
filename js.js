const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");

const app = express();
const port = 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mysql connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "anas"
});
db.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to DataBase");
});

// serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "html.html"));
});

// insert user via POST
app.post("/adduser", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("❌ Missing data");
  }

  const sql = "INSERT INTO users (user_name, password) VALUES (?, ?)";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Error inserting user");
    }
    res.send("✅ User inserted successfully");
  });
});

// start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
