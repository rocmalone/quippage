const { log, warn, error } = require("./helpers");

let client;
let db;

const userCol = "users";

async function config(newClient) {
  client = newClient;
  db = client.db("quippage");
  // Try to ping the db
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();
  // Send a ping to confirm a successful connection
  await db.command({ ping: 1 });
  log("Pinged your deployment. You successfully connected to MongoDB!");
  await clearAll();
  await bootstrap();
}

async function bootstrap() {
  const exampleUser = {
    username: "test",
    email: "test@gmail.com",
    password: "$2b$10$gcrTYstJ4T6pZFVF6kCrp.WRugmkME0hXWEG7H0D2IbYxjknPwctu",
  };
  await db.collection("users").insertOne(exampleUser);
  log("Bootstrapped test data");
}

async function clearAll() {
  // Get a list of all collections in the database
  const collections = await db.listCollections().toArray();
  collections.forEach((collection) => {
    clearCollection(collection.name);
  });
  log("Cleared all data");
}

async function clearCollection(name) {
  // Use deleteMany to remove all documents in the collection
  await db.collection(name).deleteMany({}, (err, result) => {
    if (err) throw err;

    log(`${result.deletedCount} documents removed from ${name}`);
  });
}

async function getUserByUsername(target) {
  log(`Looking for user '${target}'`);
  try {
    const user = await db.collection(userCol).findOne({ username: target });
    return user;
  } catch (e) {
    console.error(e);
  }
}

async function getUserById(id) {
  try {
    const user = await db.collection(userCol).findOne({ _id: ObjectId(id) });
    return user;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  config,
  bootstrap,
  clearAll,
  clearCollection,
  getUserByUsername,
  getUserById,
};
