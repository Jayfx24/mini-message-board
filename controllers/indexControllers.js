const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const emptyErr = "must be filled";
const lengthErr = "must be filled";
("must be between 1 and 18 characters.");
const validateUser = [
  body("name")
    .trim()
    .isString()
    .isAlpha()
    .withMessage(`Author must only contain letters.`)
    .isLength({ min: 1, max: 18 })
    .withMessage(`Author name ${lengthErr}`),
  body("text").trim().isString().notEmpty().withMessage(`Message ${emptyErr}`),
];

async function indexController(req, res) {
  const messages = await db.getAllMessages();
  res.render("index", { messages, title: "Home" });
}

function messageGetController(req, res) {
  res.render("form", { title: "Create new message" });
}

async function messagePostController(req, res) {
  // if (!req.body.name || !req.body.text) return res.redirect("new");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      title: "Create new message",
      errors: errors.array(),
    });
  }
  const { name, text } = matchedData(req);
  const added = new Date();

  await db.insertMessage({ message: text, user: name, added });
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

  const date = msg[0]["created_at"].toDateString();


  return res.render("user/user", { msg: msg[0], title: msg[0].username, date });
}

module.exports = {
  indexController,
  messageGetController,
  messagePostController: [validateUser, messagePostController],
  pageNotFoundController,
  userController,
};
