const { MongoClient } = require("mongodb");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { log, warn, error, readEnvVar } = require("./helpers.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = readEnvVar("PORT", "3000");
const ACCESS_TOKEN_SECRET = readEnvVar("ACCESS_TOKEN_SECRET");
const REFRESH_TOKEN_SECRET = readEnvVar("REFRESH_TOKEN_SECRET");
const DB_URI = readEnvVar("DB_URI");

const client = new MongoClient(DB_URI);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.post("/api/user/login", authenticateToken, (req, res) => {
  console.log("recieved data: ", req.body);
  res.status(200).send("ok");
});

const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Jim",
    title: "Post 2",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req["user"]["name"]));
});

app.post("/api/login", (req, res) => {
  // Authenticate User

  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function authenticateToken(req, res, next) {
  // Get the token client sends us, verify it is the correct user, return that user
  // Token is in the "authorization" header: Bearer TOKEN
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // TOKEN
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send(err);
    req["user"] = user;
    next();
  });
}
// https://www.youtube.com/watch?v=mbsmsi7l3r4&list=PLZlA0Gpn_vH9yI1hwDVzWqu5sAfajcsBQ&index=3
function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "60s" });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
