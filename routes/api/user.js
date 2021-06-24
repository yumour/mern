const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");

const { check, validationResult } = require("express-validator/");
const User = require("../../module/User");
// @route  POST api/users
// @desc    new user
// @acces puplic

router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more charcters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User Already exist " });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtsecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send("Server failed ");
    }
  }
);
router.put(
  "/:id",
  [
    auth,
    [
      check("text", "text is required").not().isEmpty(),
      check("post", "post is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      let user = await User.findById(req.params.id);
      const update = {
        from: req.user.id,
        text: req.body.text.trim(),
        post: req.body.post,
        date: Date.now(),
      };
      user.updates.unshift(update);

      await user.save();

      res.json(user);
    } catch (error) {
      res.status(500).send("Server failed ");
    }
  }
);
router.put("/update/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    const updateIndex = user.updates.findIndex(
      (item) => item.id === req.params.id
    );

    if (updateIndex === null) res.status(400).send("Not Found");
    user.updates[updateIndex].seen = true;
    await user.save();

    res.json(user);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(500).json({ msg: " not found" });
    }
    res.status(500).send("Server failed ");
  }
});
module.exports = router;
