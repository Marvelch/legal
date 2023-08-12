const argon2 = require("argon2");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

const users = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: ["id", "fullName", "email", "role"],
    });

    res.status(200).json({ msg: user });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const create = async (req, res) => {
  const { fullName, email, password, confirmPassword, role } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Please check again your password" });
  }
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      fullName: fullName,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "successful registration" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
    console.log(error);
  }
};

const show = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["fullName", "email", "role"],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const update = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const { fullName, email, password, confirmPassword, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Please check again your password" });
  }
  try {
    await User.update(
      {
        fullName: fullName,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Data update has been successful" });
  } catch (error) {
    res.status(400).json({ msg: "Resource not found" });
  }
};

const destroy = async (req, res) => {
  try {
    const refreshTokenCookies = req.cookies.refreshToken;
    if (!refreshTokenCookies)
      return res.status(401).json({ msg: "Unauthorized" });
    const user = await User.findOne({
      where: {
        refreshToken: refreshTokenCookies,
      },
    });
    if (user.role == "admin") {
      const deleteUser = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!deleteUser) return res.status(404).json({ msg: "Not Found" });
    } else {
      return res.status(403).json({ msg: "Forbidden" });
    }
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    const passwordMatch = await argon2.verify(user.password, req.body.password);

    if (!passwordMatch)
      return res.status(401).json({ error: "Incorrect password" });
    const id = user.id;
    const fullName = user.fullName;
    const email = user.email;
    const role = user.role;
    const accessToken = jwt.sign(
      { id, fullName, email, role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { id, fullName, email, role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    await User.update(
      { refreshToken: refreshToken },
      {
        where: {
          id: id,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ msg: accessToken });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { users, create, show, update, destroy, login };
