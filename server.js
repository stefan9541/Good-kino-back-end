const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const routes = require("./routes");

let config;
if (process.env.NODE_ENV !== "production") {
  config = require("./config/main");
}

const mongoConfig = {
  dbName: "Stepan",
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
const mongoUri = config.mongoUri;

require("./passport-strategy/google-strategy");
require("./passport-strategy/local-strategy");

const app = express();

const startExpressApp = () => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.use(
    session({
      secret: "jack balboa",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      name: "__session",
      cookie: {
        expires: 24 * 60 * 60 * 1000,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  routes(app);

  app.get("/api/logout", (req, res) => {
    req.logOut();
    res.redirect(
      process.env.NODE_ENV === "production"
        ? "https://good-kino-e6706.firebaseapp.com/"
        : "http://localhost:3000"
    );
  });

  startServer();
};

const startServer = () => {
  const server = http.createServer(app);
  server.listen(process.env.PORT || config.port, function () {
    console.log(
      `==== Server started on port ${process.env.PORT || config.port} =====`
    );
  });
};

mongoose
  .connect(mongoUri, mongoConfig)
  .then(() => {
    console.log("Database successfully connected");
    startExpressApp();
  })
  .catch((err) => console.log(err));
