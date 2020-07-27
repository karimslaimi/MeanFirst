const mongoose = require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/TaskManager",{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("db works");
}).catch((e)=>{
    console.log("error db");
    console.log(e)
});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports={
    mongoose
};
