const { User } = require("../models");
const jwt = require("jsonwebtoken");

const refreshToken = async (req, res) => {
  try {
    const refreshTokenCookies = req.cookies.refreshToken;
    console.log(refreshTokenCookies);
    if (!refreshTokenCookies)
      return res.status(401).json({ msg: "Unauthorized" });
    const user = await User.findOne({
      where: {
        refreshToken: refreshTokenCookies,
      },
    });
    if (!user) return res.status(400).json({ msg: "Not Found" });
    jwt.verify(
      refreshTokenCookies,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.status(403).json({ msg: "Forbidden" });
        const id = user.id;
        const fullName = user.fullName;
        const email = user.email;
        const accessToken = jwt.sign(
          { id, fullName, email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15s" }
        );
        res.status(200).json(accessToken);
      }
    );
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

module.exports = { refreshToken };
