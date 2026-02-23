const { Router } = require("express");
const {indexController,pageNotFoundController} = require("../controllers/indexControllers")

const indexRouter = Router()

indexRouter.get("/",indexController)
indexRouter.use(pageNotFoundController)


module.exports = indexRouter