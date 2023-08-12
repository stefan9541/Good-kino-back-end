const passport = require("passport");
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