const { Router } = require("express");
const {
  messageGetController,
  messagePostController,
} = require("../controllers/indexControllers");
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
  body("text").trim().isString().notEmpty().withMessage(`Author ${emptyErr}`),
];
const messageRouter = Router();

messageRouter.get("/", messageGetController);
messageRouter.post("/", messagePostController);

module.exports = messageRouter;
