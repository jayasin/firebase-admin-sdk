import Router from "express-promise-router";
import fileController from "./file.controller.js";


const router = new Router();

router.use("/file", fileController);


export default router;