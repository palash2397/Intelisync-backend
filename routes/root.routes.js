import contactRouter from "./contact.routes.js";
import {Router} from "express"

const rootRouter = Router()

rootRouter.use("/contact", contactRouter); 


export default rootRouter;
