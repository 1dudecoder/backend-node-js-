const express = require("express");
const Joi = require("joi");
const logger = require("./logger");
const auther = require("./auth");
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(logger);
app.use(auther);





//not using it here we are creating a seprate file for middleware

// app.use((req,res,next)=>{
//     console.log("loggin");
//     next();
// })

// app.use((req,res,next)=>{
//     console.log("AUthentication");
//     next();
// })


const course = [
    {id:1,coursename:"course1"},
    {id:2,coursename:"course2"},
    {id:3,coursename:"course3"}
]


app.get("/",(req,res)=>{
    res.send("hellow world can u here me");
})

app.get("/home",(req,res)=>{
    res.send("welcome home sir");
})

app.get("/course/:id",(req,res)=>{
    
    let data = course.find((e => e.id === parseInt(req.params.id)));
            //this find method not give data in array format
    // let data = course.filter((e)=>e.id == parseInt(req.params.id));
            //this filter method give data in array
    res.send(JSON.stringify(data));
})

app.get("/api/courses/",(req,res)=>{
    
    res.send(JSON.stringify(course));
})

app.post("/api/course",(req,res)=>{

    //here we creating our scheema tha how much our scheema should looks like
    const Schema = Joi.object({
        name: Joi.string().min(3).max(5).required(),
    })


    //here we are checking our body data validates our conditions or not if not then give a error
    let getdata = Schema.validate(req.body);

    //giving a good error like this
    if(getdata.error){
        res.status(400).send(getdata.error.details[0].message);
        return;
    }

    //ignore this down lines
    // const inputcourse = {
    //     id: course.length + 1,
    //     coursename: req.body.name 
    // }
    // course.push(inputcourse);
    // res.send(course);
})


app.put("/api/course/:id",( req,res )=>{

    //first checking that data is avalable or not in db
    let data = course.find((e => e.id === parseInt(req.params.id)));
    //if not available then error to the user
    if(!data){
        return res.status(400).send("course is invalid");
    }
    //then check the data which user send is valid or not
    const result = validatacourse(req.body);
    //if not then send this error
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }
    data.coursename = req.body.name;
    res.send(course);
});

    function validatacourse(coursedata){
        //here we creating our scheema tha how much our scheema should looks like
        const Schema = Joi.object({
            name: Joi.string().min(3).required(),
        })
        //here we are checking our body data validates our conditions or not if not then give a error
        return Schema.validate(coursedata);
    }



    app.delete("/api/courses/:id",(req,res)=>{
    //first checking that data is avalable or not in db
    let data = course.find((e => e.id === parseInt(req.params.id)));
    //if not available then error to the user
    if(!data){
        return res.status(400).send("course is invalid");
    }
    const index = course.indexOf(data);
    course.splice(index,1);
    res.send(course);
    });



app.get("/home/:id/:movie/:nitin/:negi",(req,res)=>{
    res.send(req.params);
});




const PORT = process.env.PORT || 3000;

app.listen(PORT,console.log(`this is port ${PORT}`));



