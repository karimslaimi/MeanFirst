const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require('lodash');

const crypt = require("crypto");
const bcrypt = require("bcryptjs");
//jwt secrets
const jwtSecret = "63702501648469815398fadfqsgtghfd51887898";


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,

    },
    sessions: [{
        token: {type: String, required: true},
        expiresAt: {type: Number, required: true}
    }]
});

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    // return the document except the password and sessions (these shouldn't be made available)
    return _.omit(userObject, ['password', 'sessions']);
}

UserSchema.methods.generateAccessAuthToken = function () {
    const user = this;
    return new Promise((resolve, reject) => {
        //create the json web token
        jwt.sign({_id: user._id.toHexString()}, jwtSecret, {expiresIn: '15m'}, (err, token) => {
            if (!err) {
                resolve(token);
            } else {
                reject();
            }
        })
    })
};

UserSchema.methods.generateRefreshAuthToken  = function () {
    return new Promise((resolve, reject) => {
        crypt.randomBytes(64, (err, buff) => {
            if (!err) {
                let token = buff.toString('hex');
                return resolve(token);
            }
        })
    })
};


UserSchema.methods.createSession = function () {
    let user = this;
    console.log("create session");
    return user.generateRefreshAuthToken ().then((refreshtoken) => {
        return saveSessionDB(user, refreshtoken);
    }).then((refreshtoken) => {
        return refreshtoken
    }).catch((e) => {
        return Promise.reject('Failed to create session try again later')
    })
};


let saveSessionDB = (user, refreshtoken) => {

        // Save session to database
        return new Promise((resolve, reject) => {
            let expiresAt = generateRefreshTokenExpiryTime();

            user.sessions.push({ 'token': refreshtoken, expiresAt });

            user.save().then(() => {
                // saved session successfully
                return resolve(refreshtoken);
            }).catch((e) => {
                reject(e);
            });
        })
    };


let generateRefreshTokenExpiryTime = () => {
    let daysuntilexpire = 10;
    let seconduntilexpire = ((daysuntilexpire * 24) * 60) * 60;

    return ((Date.now() / 1000) + seconduntilexpire);
};

UserSchema.statics.findByIdAndToken = function (_id, token) {
    const user = this;
    return user.findOne({
        _id,
        'sessions.token': token
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
    const user = this;
    return user.findOne({
        email
    }).then((user) => {
        if (!user) {
            return Promise.reject()
        } else {
            return new Promise(((resolve, reject) => {
                bcrypt.compare(password, user.password, ((error, res) => {
                    if (res) {
                        resolve(user);
                    } else {
                        reject();
                    }
                }))
            }))
        }
    });

};


UserSchema.methods.hasRefreshTokenExpired = (expiresAt) => {
    let secondsSinceEpoch = Date.now() / 1000;
    if (expiresAt > secondsSinceEpoch) {
        return false;
    } else {
        return true;
    }
};


//middleware to hash the password
UserSchema.pre('save', function (next) {
    let user = this;
    let costfactor = 10;
    if (user.isModified("password")) {
        bcrypt.genSalt(costfactor, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});


UserSchema.statics.getJwtSecret= ()=>{
return jwtSecret;
}

const User = mongoose.model('User', UserSchema);

module.exports = {User};
