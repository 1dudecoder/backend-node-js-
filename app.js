const express = require("express");
const logger = require("./middleware/logger");
const auther = require("./middleware/auth");
const courses = require("./routes/courses");
const home = require("./routes/home");
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(logger);
app.use(auther);
app.use("/api/courses",courses);
app.use("/",home);

if(app.get("env") === "development"){
    console.log("this is development");
}

const PORT = process.env.PORT || 3000;

app.listen(PORT,console.log(`this is port ${PORT}`));



