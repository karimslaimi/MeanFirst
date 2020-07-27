var express=require("express");

var app=express();

var bodyparser=require("body-parser");

var {mongoose}=require("../DB/Mongoose");

// so let s load the models
const {List}=require("../DB/Models/ListModel");
const {task}=require("../DB/Models/TaskModel");

//this is the middleware so we can parse the request and get the body of it
app.use(bodyparser.json());

//let s create a method to return all list

app.get("/lists",(req,res)=>{
    List.find({}).then((lists)=>{
       res.send(lists);
   }).catch((error) => {
        console.log(error);
    });
});

//the create method

app.post("/lists",(req,res)=>{

    let title=req.body.title;
    let newlist=new List({
        title:title
    });
    newlist.save().then((listdoc)=>{
        res.send(listdoc);
    })
});


app.patch('/lists/:id',(req,res)=>{
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
});


app.delete("/lists/:id",(req,res)=>{
    List.findOneAndDelete({_id:req.params.id}).then(()=>{
        res.send({"message":"deleted"})
    });
});




app.get("/",(req,res)=>{
    console.log("this shiit is pissing me off");
    res.send("trying the api")
});
module.exports = app;
