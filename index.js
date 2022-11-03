const express = require("express");
const apps = express();
const passport = require("passport");
const sessionExpress = require("express-session");
require("./config/passport");
const db = require("./models");
const jwt = require("jsonwebtoken");
const cors = require("cors");

apps.use(cors());
apps.use(sessionExpress({resave: false, saveUninitialized: true, secret: "belajar login sama gugel"}))
apps.use(passport.initialize());
apps.use(passport.session());

// apps.get("/api/v1/auth/google", passport.authenticate("google", {
//     scope: ["email", "profile"],
    
// }))

apps.get("/api/v1/auth/google", passport.authenticate("google", {scope: ["email", "profile"], successRedirect: "/api/v1/auth/protected", failureRedirect: "/api/v1/auth/fail" }))

// apps.get("/api/v1/auth/google", passport.authenticate({successRedirect: "/api/v1/auth/protected", failureRedirect: "/api/v1/auth/fail"}))
apps.get("/api/v1/auth/protected", async (requested, responses) => {
    console.log(requested.user)
    const dataUser = await db.users.findOrCreate({
        where: {
            name: requested.user.displayName,
            email: requested.user.email,
            photo: requested.user.picture,
            password: "kosong dulu guys",
        }
    })
    const token = jwt.sign({name: requested.user.displayName, email: requested.user.email, photo: requested.user.picture}, "secret key ini guys")
    responses.redirect(`http://localhost:3000/${token}`)

})

apps.get("/api/v1/users", async(requested, responses) => {
    console.log(requested.headers.authorization);
    if(!requested.headers.authorization){
        return responses.json({message: "authenticate failed"})
    }
    const token = requested.headers.authorization.split(" ") [1];
    const credentials = jwt.verify(token, "secret key ini guys");
    if(credentials){
        const dataFromDB = await db.users.findOne({
            where: {
                email: credentials.email
            }
        })
        return responses.json({ Message: "ambil data profile", data: dataFromDB})
    }
})

apps.listen(8000, () => {
    console.log("the server is running on port 8000");
})