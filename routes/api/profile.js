const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/");
const Profile = require("../../module/Profile");
const User = require("../../module/User");
const Post = require("../../module/Post");
// @route  GET api/profile/me
// @desc  get current user profile
// @acces puplic

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "there is no such profile" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});
//// @route  POST api/profile/
// @desc  create/update profile
// @acces private
router.post(
  "/",
  [
    auth,
    [
      // Checking inputs
      check("status", "status is required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // destructing
    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      youtube,
      facebook,
      instagram,
      linkedin,
      twitter,
    } = req.body;

    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      // create
      profile = await Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  GET api/profile
// @desc  get All profile
// @acces puplic
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
// @route  GET api/profile/user/:user_id
// @desc  get profile by user id
// @acces puplic
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      res.status(500).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);

    if (error.kind == "ObjectId") {
      return res.status(500).json({ msg: "Profile not found" });
    }

    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/profile/
// @desc  del profile ,user & post
// @acces private
router.delete("/", auth, async (req, res) => {
  try {
    // @todo -remove user post

    //remove profile
    await Profile.findOneAndRemove({
      user: req.user.id,
    });
    await User.findOneAndRemove({
      _id: req.user.id,
    });
    await Post.findOneAndRemove({
      creator: req.user.id,
    });
    res.json({ msg: "User deleted" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
// @route  PUT api/profile/exprience
// @desc  Add exprience
// @acces private
router.put(
  "/exprience",
  [
    auth,
    [
      check("title", "Title is required ").not().isEmpty(),
      check("company", "Company is required ").not().isEmpty(),
      check("from", "from is required ").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // destructing
    const { title, company, location, from, to, current, description } =
      req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.exprience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
// @route  DELETE api/profile/exprience/exp_id
// @desc  DELETE exprience
// @acces private
router.delete("/exprience/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.exprience.findIndex(
      (item) => item.id === req.params.id
    );

    profile.exprience.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
// @route  PUT api/profile/education
// @desc  Add education
// @acces private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required ").not().isEmpty(),
      check("school", "Degree is required ").not().isEmpty(),
      check("fieldofstudy", "Field Of Study is required ").not().isEmpty(),
      check("from", "from is required ").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // destructing
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    const newExp = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
// @route  DELETE api/profile/education/exp_id
// @desc  DELETE education
// @acces private
router.delete("/education/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education.findIndex(
      (item) => item.id === req.params.id
    );

    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
