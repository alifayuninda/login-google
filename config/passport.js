const passport = require("passport");
const expassport = require("passport");
const { Strategy } = require("passport-google-oauth2");

passport.use(new Strategy(
    {
    clientID: process.env.PASSPORT_CLIENT_ID,
    clientSecret: process.env.PASSPORT_CLIENT_SECRET,
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