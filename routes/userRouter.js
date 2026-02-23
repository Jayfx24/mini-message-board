const { Router } = require("express");
const { userController } = require("../controllers/indexControllers");

const userRouter = Router();


userRouter.get("/:user", userController)

module.exports = userRouter;
