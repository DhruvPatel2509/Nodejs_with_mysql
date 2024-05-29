const mysql = require("mysql2");

const db = require("../db");

exports.getAllUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const { username, firstname } = req.body;
  const image = req.file.filename;
  db.query(
    "INSERT INTO users (username, firstname, image) VALUES (?, ?, ?)",
    [username, firstname, image],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json({
        message: "User created successfully",
        userId: result.insertId,
      });
    }
  );
};

exports.updateUser = (req, res) => {
  const userId = req.params.userId;
  const { username, firstname } = req.body;
  const image = req.file.filename;
  db.query(
    "UPDATE users SET username = ?, firstname = ?, image = ? WHERE id = ?",
    [username, firstname, image, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User updated successfully" });
    }
  );
};

exports.getUserAddresses = (req, res) => {
  const userId = req.params.userId;
  db.query(
    "SELECT * FROM addresses WHERE userId = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(results);
    }
  );
};

exports.getUserById = (req, res) => {
  console.log(req.params.userId);

  const userId = req.params.userId;
  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(results[0]);
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.userId;
  db.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  });
};
