const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];
function indexController(req, res) {
  
  res.render("index", { messages, title: "Home" });
}

function messageGetController(req, res) {
  res.render("form", { messages, title: "New Message" });
}

function messagePostController(req, res) {
  if(!req.body.name || !req.body.text) return res.redirect("new")
  
  const user = req.body.name;
  const text = req.body.text;
  const added = new Date();
  messages.unshift({ text, user, added });
  res.redirect("/");
}

function pageNotFoundController(req, res) {
  return res.status(404).render("404", { title: "page not found" });
}

function userController(req, res) {
  const { user } = req.params;
  const msg = messages[user];
  if (!msg) res.status(404).send("<h1>User does not exist</h1> <a href='/'>Back Home</a>");

  const date = msg.added.toDateString();

  res.render("user/user", { msg, title: msg.user, date });
}

module.exports = {
  indexController,
  messageGetController,
  messagePostController,
  pageNotFoundController,
  userController,
};
