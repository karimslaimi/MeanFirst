const express = require('express');
const app = express();



const bodyParser = require('body-parser');

// Load in the mongoose models
const {  User } = require('../DB/Models/User');

const jwt = require('jsonwebtoken');


/* MIDDLEWARE  */

// Load middleware
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

  res.header("Access-Control-Allow-Methods","GET, POST , DELETE, PATCH, PUT , OPTIONS, HEAD");
  res.header(
      'Access-Control-Expose-Headers',
      'x-access-token, x-refresh-token'
  );
  next();
});





let authenticate=(req,res,next)=>{
let token=req.header("x-access-token");
jwt.verify(token,User.getJwtSecret(),(err,decode)=>{
  if(err){
    res.status(401).send(err);
  }else {
    req.user_id=decode._id;

    next();
  }

});
};




let verifysession=function (req,res,next){
  let refreshToken=req.header("x-refresh-token");
  let _id=req.header("_id");
  User.findByIdAndToken(_id,refreshToken).then((user)=>{
    if(!user)
      return Promise.reject({'error':"User not found "})

    req.user_id=user._id;
    req.refreshtoken=refreshToken;
    req.userObject=user;
    let sessionvalide=false;

    user.sessions.forEach((session)=>{
      if(session.token===refreshToken){
        if(user.hasRefreshTokenExpired(session.expiresAt)===false){
          sessionvalide=true;
        }
      }
    });
    if(sessionvalide){
      next();
    }else{
      return Promise.reject({
        "error":'Refresh token expired'
      })
    }
  }).catch((e)=>{
    res.status(401).send(e);
  })
};




//sign up method
app.post('/users', (req, res) => {
  // User sign up

  let body = req.body;
  let newUser = new User(body);

  newUser.save().then(() => {
    console.log("created user");
    return newUser.createSession();
  }).then((refreshToken) => {
    // Session created successfully - refreshToken returned.
    // now we geneate an access auth token for the user

    return newUser.generateAccessAuthToken().then((accessToken) => {
      // access auth token generated successfully, now we return an object containing the auth tokens
      return { accessToken, refreshToken }
    });
  }).then((authTokens) => {
    // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
    res
        .header('x-refresh-token', authTokens.refreshToken)
        .header('x-access-token', authTokens.accessToken)
        .send(newUser);
  }).catch((e) => {
    res.status(400).send(e);
  })
});


app.post("/users/login", (req,res)=>{
  let mail=req.body.email;
  let password=req.body.password;
  User.findByCredentials(mail,password).then((user)=>{

    return  user.createSession().then((refreshtoken)=>{
      return user.generateAccessAuthToken().then((accesstoken)=>{
        return {accesstoken,refreshtoken};
      });
    }).then((authtoken)=>{
      res.header("x-refresh-token",authtoken.refreshtoken).header("x-access-token",authtoken.accesstoken).send(user);
    }).catch((e)=>{
      res.status(400).send(e);
    })
  })
});





//access token
app.get("/users/me/access-token",verifysession,(req,res)=>{

  req.userObject.generateAccessAuthToken().then((accesstoken)=>{
    res.header("x-access-token",accesstoken).send({accesstoken});
  }).catch((e)=>{
    res.status(400).send(e);
  })

});


module.exports = {app,authenticate};
