const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
let googleStrategy;
if (process.env.NODE_ENV !== "production") {
  googleStrategy = require("../config/main").googleStrategy;
}
const UserModel = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  UserModel.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || googleStrategy.clientID,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || googleStrategy.clientSecret,
      callbackURL: "/api/google/redirect"
    },
    (accessToken, refreshToken, profile, cb) => {
      //  chek if user already exist in our dataBase
      UserModel.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          cb(null, currentUser);
        } else {
          const { _json } = profile;
          new UserModel({
            googleId: _json.sub,
            userName: _json.name,
            picture: _json.picture
          }).save((err, newUser) => {
            if (err) console.log(err);
            cb(null, newUser);
          });
        }
      });
    }
  )
);
