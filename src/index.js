import express from "express";
const app = express();
app.use(express.json());


// app.use('/users',userRoutes)
app.listen(3000,()=>{
    console.log("running on 3000");
});