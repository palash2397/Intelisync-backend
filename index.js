import "dotenv/config.js"
import express from "express"
import rootRouter from "./routes/root.routes.js";

const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/", (req,res)=>{
    res.send("hello world!")
})

app.use("/api/v1", rootRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
