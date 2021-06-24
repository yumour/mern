const express = require("express");
const connectDb = require("./config/db");
const path = require("path");
const app = express();

connectDb();

app.use(express.json({ extended: true }));
// Routeer
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/post"));
app.use("/api/profile", require("./routes/api/profile"));
// server static
if (process.env.NODE_ENV === "production") {
  // set
  app.use(express.static("/client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("listening on port 5000"));
