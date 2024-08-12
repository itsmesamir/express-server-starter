const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../../data/db.json");
let db = require(dbPath);

const saveToDb = () => {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

exports.getAllUsers = (req, res) => {
  res.status(200).json(db.users);
};

exports.getUserById = (req, res) => {
  const user = db.users.find((u) => u.id == req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  newUser.id = db.users.length + 1;
  db.users.push(newUser);
  saveToDb();
  res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
  const index = db.users.findIndex((u) => u.id == req.params.id);
  if (index !== -1) {
    db.users[index] = req.body;
    db.users[index].id = req.params.id; // Ensure ID remains the same
    saveToDb();
    res.status(200).json(db.users[index]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

exports.deleteUser = (req, res) => {
  db.users = db.users.filter((u) => u.id != req.params.id);
  saveToDb();
  res.status(204).end();
};
