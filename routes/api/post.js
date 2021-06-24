const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../module/User");
const Post = require("../../module/Post");
const Profile = require("../../module/Profile");

const { check, validationResult } = require("express-validator/");
// @route  POST api/post
// @desc  add post
// @acces private
router.post(
  "/",
  [auth, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      const newPost = new Post({
        title: req.body.title,
        creator: req.user.id,
        contractor: req.body.contractor,
        description: req.body.description,
        total: req.body.total,
        end: req.body.end,
        other: req.body.other,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("server error");
    }
  }
);

// @route GET api/post
// @desc get all post
// @ acces private
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .select("title  description number  creator date")
      .populate("creator", ["name", "avatar"])
      .sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});
// @route GET api/post/user/:id
// @desc get all post by user
// @ acces public
router.get("/user/:id", async (req, res) => {
  try {
    const posts = await Post.find({
      $or: [{ creator: req.params.id }, { contractor: req.params.id }],
    })
      .select("title  description number  creator date")
      .sort({
        date: -1,
      });

    res.json(posts);
  } catch (error) {
    if (error.kind == "ObjectId") {
      res.status(500).json({ msg: " not found" });
    }
    res.status(500).send("server error");
  }
});

// @route GET api/ number
// @desc post by number
// @ acces private
router.get("/:number", auth, async (req, res) => {
  try {
    const post = await Post.findOne({ number: req.params.number }).populate(
      "creator",
      ["name", "avatar"]
    );
    if (!post) {
      return res.status(400).json({ msg: "there is no such post" });
    }
    res.json(post);
  } catch (error) {
    console.log(error.message);
    if (error.kind === "Number") {
      return res.status(400).json({ msg: "there is no such post" });
    }
    res.status(500).send("server error");
  }
});

// @route  DELETE api/post
// @desc  delete post
// @acces private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check
    if (!post) {
      return res.status(400).json({ msg: "there is no such post" });
    }
    if (post.creator != req.user.id) {
      return res.status(400).json({ msg: "Authoziration Denied" });
    }
    await post.remove();
    res.json({ msg: "Succes" });
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "there is no such post" });
    }
    res.status(500).send("server error");
  }
});
//// @route PUT api/post/:id
// @desc update post
// @acces  private
router.put(
  "/:id",
  [auth, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      let post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(400).json({ msg: "there is no such post" });
      }
      if (post.creator != req.user.id && post.contractor != req.user.id) {
        return res.status(400).json({ msg: "Authoziration Denied" });
      }
      const updated = { ...req.body, modified: Date.now() };
      post = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: updated },
        { new: true }
      ).populate("creator", ["name", "avatar"]);
      res.json(post);
    } catch (error) {
      if (error.kind === "ObjectId") {
        return res.status(400).json({ msg: "there is no such post" });
      }
      res.status(500).send("server error");
    }
  }
);
//// @route PUT api/post/cost/:id/
// @desc add post cost
// @acces  private
router.put(
  "/cost/:id",
  [
    auth,
    [
      check("activity", "activity is required").not().isEmpty(),
      check("amount", "amount is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      let post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(400).json({ msg: "there is no such post" });
      }
      if (post.contractor != req.user.id && post.creator != req.user.id) {
        return res.status(400).json({ msg: "Authoziration Denied" });
      }

      const newCost = { activity: req.body.activity, amount: req.body.amount };
      post.cost.unshift(newCost);
      const updated = { ...post, modified: Date.now() };
      post = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: updated },
        { new: true }
      ).populate("creator", ["name", "avatar"]);

      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  }
);
/// @route PUT api/post/finnance/:id/
// @desc add post finnance
// @acces  private
router.put(
  "/finnance/:id",
  [
    auth,
    [
      check("activity", "activity is required").not().isEmpty(),
      check("amount", "amount is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      let post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(400).json({ msg: "there is no such post" });
      }
      if (post.contractor != req.user.id && post.creator != req.user.id) {
        return res.status(400).json({ msg: "Authoziration Denied" });
      }

      const newCost = { activity: req.body.activity, amount: req.body.amount };
      post.finnance.unshift(newCost);

      const updated = { ...post, modified: Date.now() };
      post = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: updated },
        { new: true }
      ).populate("creator", ["name", "avatar"]);

      res.json(post);
    } catch (error) {
      res.status(500).send("server error");
    }
  }
);
/// @route PUT api/post/schedule/:id/
// @desc add schedule
// @acces  private
router.put(
  "/schedule/:id",
  [
    auth,
    [
      check("activity", "activity is required").not().isEmpty(),
      check("amount", "amount is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      let post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(400).json({ msg: "there is no such post" });
      }
      if (post.contractor != req.user.id && post.creator != req.user.id) {
        return res.status(400).json({ msg: "Authoziration Denied" });
      }

      const newCost = { activity: req.body.activity, amount: req.body.amount };
      post.schedule.unshift(newCost);

      const updated = { ...post, modified: Date.now() };
      post = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: updated },
        { new: true }
      ).populate("creator", ["name", "avatar"]);

      res.json(post);
    } catch (error) {
      res.status(500).send("server error");
    }
  }
);
// @route  DELETE api/post/:id/cost/cost_id
// @desc  DELETE cost
// @acces private
router.delete("/:id/cost/:cosId", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id).populate("creator", [
      "name",
      "avatar",
    ]);
    if (!post) {
      return res.status(400).json({ msg: "there is no such post" });
    }
    if (post.contractor != req.user.id && post.creator._id != req.user.id) {
      return res.status(400).json({ msg: "Authoziration Denied" });
    }
    const removeIndex = post.cost.findIndex(
      (item) => item.id === req.params.costId
    );
    post.cost.splice(removeIndex, 1);
    post.modified = Date.now();

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
// @route  DELETE api/post/:id/finnance/finId
// @desc  DELETE cost
// @acces private
router.delete("/:id/finnance/:finId", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id).populate("creator", [
      "name",
      "avatar",
    ]);
    if (!post) {
      return res.status(400).json({ msg: "there is no such post" });
    }
    if (post.contractor != req.user.id && post.creator != req.user.id) {
      return res.status(400).json({ msg: "Authoziration Denied" });
    }
    const removeIndex = post.finnance.findIndex(
      (item) => item.id === req.params.finId
    );

    post.finnance.splice(removeIndex, 1);
    post.modified = Date.now();

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
// @route  DELETE api/post/:id/schedule/fId
// @desc  DELETE schedule
// @acces private
router.delete("/:id/schedule/:finId", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id).populate("creator", [
      "name",
      "avatar",
    ]);
    if (!post) {
      return res.status(400).json({ msg: "there is no such post" });
    }
    if (post.contractor != req.user.id && post.creator != req.user.id) {
      return res.status(400).json({ msg: "Authoziration Denied" });
    }
    const removeIndex = post.schedule.findIndex(
      (item) => item.id === req.params.costId
    );

    post.schedule.splice(removeIndex, 1);
    post.modified = Date.now();

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
