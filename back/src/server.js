const { MongoClient } = require("mongodb");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { log, warn, error, readEnvVar } = require("./helpers.js");
const db = require("./db.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Passport middleware

const PORT = readEnvVar("PORT", "3000");
const ACCESS_TOKEN_SECRET = readEnvVar("ACCESS_TOKEN_SECRET");
const REFRESH_TOKEN_SECRET = readEnvVar("REFRESH_TOKEN_SECRET");
const DB_URI = readEnvVar("DB_URI");

const client = new MongoClient(DB_URI);
db.config(client);

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

//
//
// *** AUTHORIZATION
//
//
//

// user contains:
//    { id, username, email, password }
let users = [];

// Create new accessToken & refreshToken
app.post("/api/login", async (req, res) => {
  // Validate: bad request
  // req:
  //      { username, password }
  if (!req.body.username || !req.body.password) return res.sendStatus(400);
  // **Authenticate User's Credentials
  // const user = users.find((u) => u.username === req.body.username);
  const user = await db.getUserByUsername(req.body.username);
  console.log("Found user in db:", user);
  if (!user) {
    log("Attempt to login as '" + req.body.username + "' failed: username DNE");
    return res.status(401).send("Username does not exist.");
  }
  const hashedPassword = user.password;

  const validLogin = await bcrypt.compare(req.body.password, hashedPassword);

  if (!validLogin) {
    log(
      "Attempt to login as '" + req.body.username + "' failed: invalid password"
    );
    return res.status(401).send("Invalid password.");
  }

  log("Authenticating user '" + req.body.username + "'");

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET);
  // Add refresh token to data store
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
  log("Successfully authenticated '" + req.body.username + "'");
});

app.post("/api/register", async (req, res) => {
  // req.body:
  // { username, email, password }
  log("Request to create user: ", JSON.stringify(req.body));

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Store hashedPassword in DB
    const user = {
      id: Date.now().toString(),
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    users.push(user);

    // Log the user in like they just logged in
    // Basically - create their access tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET);
    // Add refresh token to data store
    refreshTokens.push(refreshToken);
    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken });
    log("Successfully responded with tokens for '" + req.body.username + "'");

    log(JSON.stringify(users));
  } catch {
    res.sendStatus(500);
  }
});

//
//
// *** AUTHENTICATION
//
//
//

// Generally - store refresh tokens in DB or Redis cache
let refreshTokens = [];

app.get("/posts", authenticateToken, (req, res) => {
  log("Client requested posts by user '" + req.user.name + "'");
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.put("/api/user", authenticateToken, (req, res) => {
  if (!req.user) {
    log("Failed authentication:  PUT /api/user");
    return res.status(401).send("Authentication failed.");
  }
  // TODO: grab this from DB
  const userIndex = users.findIndex((user) => user.id === req.user.id);
  const userInDb = users[userIndex];
  if (userInDb) {
    log(
      "Updating user '" +
        userInDb.username +
        "': change email from '" +
        userInDb.email +
        "' to '" +
        req.body.email +
        "'"
    );
    users[userIndex] = req.body;
    console.log("New users array: ", users);
    // Generate access token and refresh token
  } else {
    warn("Tried to update user but couldn't user '" + req.body.username + "'");
    res.status(404).send("Could not find user.");
  }
});

// Check if an access token is valid
app.get("/api/user", authenticateToken, async (req, res) => {
  if (req.user) {
    try {
      const userAllInfo = await db.getUserById(req.user._id);
      const userLimited = {
        _id: userAllInfo._id,
        username: userAllInfo.username,
        email: userAllInfo.email,
      };
      res.status(200).send(userLimited);
    } catch (e) {
      return res.sendStatus(500);
    }
  }
  return res.status(401);
});

// Create a new access token given a valid refresh token
app.post("/api/token", (req, res) => {
  const refreshToken = req.body.refreshToken;
  log("3");
  //   log("Refresh Tokens = " + refreshTokens);
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  log("2");
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    log("1");
    if (err) {
      error("Refresh token error: ", err);
      return res.sendStatus(403);
    }
    log("Creating new access token for '" + user.name + "'");
    const accessToken = generateAccessToken({ name: user.name });
    res.status(200).json({ accessToken: accessToken });
  });
});

// Delete a refresh token
// req = { refreshToken: refreshToken }
app.delete("/api/logout", (req, res) => {
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.body.refreshToken
  );
  // Consider - if client sends an access token too, then we should delete that
  res.sendStatus(204);
});

function authenticateToken(req, res, next) {
  // Get the token client sends us, verify it is the correct user, return that user
  // Token is in the "authorization" header: Bearer TOKEN
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // TOKEN
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send(err);
    req.user = user;
    next();
  });
}

// https://www.youtube.com/watch?v=mbsmsi7l3r4&list=PLZlA0Gpn_vH9yI1hwDVzWqu5sAfajcsBQ&index=3
function generateAccessToken(user) {
  log("Generating ACCESS_TOKEN for '" + user.username + "'");
  // Strip the user of extraneous fields which exist in the db but not in the token
  function cleanUserForToken(user) {
    // User token should include fields which we don't want to make a db call for:
    // { username, _id }
    const cleanUser = {
      username: user.username,
      _id: user._id,
    };
    console.log("parsed user:", cleanUser);
    return cleanUser;
  }
  const cleanUser = cleanUserForToken(user);
  return jwt.sign(cleanUser, ACCESS_TOKEN_SECRET, {
    expiresIn: "900s",
  }); // 900s = 15 minutes
}

app.listen(PORT, () => {
  log(`Server is running on port ${PORT}`);
});
