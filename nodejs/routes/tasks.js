var express = require("express");

var app = express();

var bodyparser = require("body-parser");

var { mongoose } = require("../DB/Mongoose");

// so let s load the models
const { List } = require("../DB/Models/ListModel");
const { Task } = require("../DB/Models/TaskModel");

var users=require("./users");


// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header("Access-Control-Allow-Methods","GET, POST , DELETE, PATCH, PUT , OPTIONS, HEAD");

    next();
});









//this is the middleware so we can parse the request and get the body of it
app.use(bodyparser.json());

//let s create a method to return all list

app.get("/lists", (req, res) => {
    List.find({
        _userId:req.user_id
    }).then((lists) => {
        res.send(lists);
    }).catch((error) => {
        console.log(error);
    });
});




//the create method

app.post("/lists", (req, res) => {

    let title = req.body.title;
    let newlist = new List({
        title: title
    });
    newlist.save().then((listdoc) => {
        res.send(listdoc);
    })
});


app.patch('/lists/:id', (req, res) => {
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully' });
    });
});


app.delete("/lists/:id", (req, res) => {
    List.findOneAndRemove({ _id: req.params.id }).then((list) => {
        res.send({ "message": "deleted" });
        deleteTaskfromList(list._id);
    });
});




app.get("/lists/:listid/tasks/:taskId", (req, res) => {
    //fetch one task of specific list
    Task.findOne({
        _listId: req.params.listid,
        _id:req.params.taskId
    }).then((task) => {
        res.send(task)
    })
});

app.get("/lists/:listid/tasks", (req, res) => {
    //fetch tasks of specific list
    Task.find({
        _listId: req.params.listid
    }).then((tasks) => {
        res.send(tasks)
    })
});

app.post("/lists/:listid/tasks", (req, res) => {
    let newtask = new Task({
        title: req.body.title,
        _listId: req.params.listid
    });
    newtask.save().then((newtaskdoc) => {
        res.send(newtaskdoc)
    })
});


app.patch("/lists/:listId/tasks/:taskId", (req, res) => {

    // console.log(req.params.listId)



    Task.findOneAndUpdate({ _id: req.params.taskId, _listId: req.params.listId }, {

        $set: req.body
    }).then((updatedtask) => {

        res.send({"message":"updatedtask"});
    })
});

app.delete("/lists/:listId/tasks/:taskId",(req,res)=>{
    Task.findOneAndDelete({

        _id:req.params.taskId,_listId:req.params.listId
    }).then(()=>{res.send("deleted")})
});



let deleteTaskfromList=(listid)=>{
        Task.deleteMany({
            _listId:listid
        }).then(()=>{
            console.log("tasks deleted")
    });
};




app.get("/", (req, res) => {
    console.log("this shiit is pissing me off");
    res.send("trying the api")
});

module.exports = app;
