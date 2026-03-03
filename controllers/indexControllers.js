const db = require("../db/queries");

async function indexController(req, res) {
  const messages = await db.getAllMessages();
  console.log(messages)
  res.render("index", { messages, title: "Home" });
}

function messageGetController(req, res) {
  res.render("form", { title: "New Message" });
}

async function messagePostController(req, res) {
  if (!req.body.name || !req.body.text) return res.redirect("new");

  const user = req.body.name;
  const message = req.body.text;
  const added = new Date();
  
  await db.insertMessage({ message, user, added });
  res.redirect("/");
}

function pageNotFoundController(req, res) {
  return res.status(404).render("404", { title: "page not found" });
}

async function userController(req, res) {
  const { user } = req.params;
  const msg = await db.searchUsername(user);
  if (!msg)
   return res
  .status(404)
  .send("<h1>User does not exist</h1> <a href='/'>Back Home</a>");
  
  const date = msg[0]['created_at'].toDateString();
  
  console.log(msg)
  return res.render("user/user", { msg:msg[0], title: msg[0].username, date});
}

module.exports = {
  indexController,
  messageGetController,
  messagePostController,
  pageNotFoundController,
  userController,
};
