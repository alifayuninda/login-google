const passport = require("passport");
const expassport = require("passport");
const { Strategy } = require("passport-google-oauth2");

passport.use(new Strategy(
    {
    clientID: "893318771586-th48sbci11sab8a112iojoc1k5e1n722.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://deploybacke.herokuapp.com/api/v1/auth/google",
    passReqToCallback: true
    },
    (requested, accessToken, refreshToken, profile, done) => {
    return done(null, profile)
    },
    passport.serializeUser((user, done) => {
    return done(null, user)
    }),
    passport.deserializeUser((user, done) => {
    return done(null, user)
    })

))