const { Router } = require("express");
const {
  messageGetController,
  messagePostController,
} = require("../controllers/indexControllers");

const messageRouter = Router();

messageRouter.get("/", messageGetController);
messageRouter.post("/", messagePostController);

module.exports = messageRouter;
