const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerSchema = require("../validators/userValidator");
const users = require("../database/users");
require("dotenv").config();

//* registering user processing

const register = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, email, password } = value;
  const exist = users.find((data) => data.username === username);

  if (exist) return res.status(400).json({ message: "username already exist" });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), username, email, password: hashed };

  users.push(user);
  return res.status(200).json({ message: "Registration Successfully" });
};

//* processing for login form !

const login = async (req, res) => {
  const { username, password } = req.body;

  const checkUser = users.find((u) => u.username === username);
  if (!checkUser) return res.status(400).json({ message: "username invalid" });

  const checkPass = await bcrypt.compare(password, checkUser.password);
  if (!checkPass) return res.status(400).json({ message: "Password invalid" });

  const token = jwt.sign(
    { id: checkUser.id, username: checkUser.username },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.json({ message: "login success", token });
};

module.exports = { register, login };
