const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(username, password, done) {
      UserModel.findOne({ email: username })
        .then(user => {
          if (!user) {
            return done(null, false);
          }

          bcrypt.compare(password, user.password).then(confirmPassword => {
            if (!confirmPassword) {
              return done(null, false);
            }

            delete user._doc.password;
            return done(null, user);
          });
        })
        .catch(err => done(err, null));
    }
  )
);
