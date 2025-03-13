import express from 'express';
import { contactUsHandle, allContactHandle } from '../controllers/contact.js';


const contactRouter = express.Router()
contactRouter.post("/contactUs",contactUsHandle )
contactRouter.get("/all", allContactHandle)

export default contactRouter;