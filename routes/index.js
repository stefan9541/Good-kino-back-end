const userIsAuthenticated = require("../middleware/user-is-authenticated");

const leftSidebarRoute = require("./left-sidebar-link-router");
const homeRouter = require("./home-router");
const paginationAndGettingMoviesFromRouting = require("./pagination-and-getting-movies-from-routing");
const searchFormRoute = require("./search-form-router");
const filterFormRouter = require("./filter-form-router");
const moviePageRouter = require("./movie-page-router");
const qualityMovieRouter = require("./quality-movie");
const commentariesRouter = require("./commentaries-router");
const googleAuth = require("./google-auth");
const localAuth = require("./local-auth");
const getAuthenticatedUser = require("./get-authenticated-user");
const favoriteMovieUserCollections = require("./favorite-movies");
const updateMovieRate = require("./update-rate-movie");
const updateContinueWatchMovie = require("./continue-watch-movie");
const updateUserAvatar = require("./update-user-image");
const updateUsername = require("./update-username");

const routes = app => {
  app.use("/api", leftSidebarRoute());
  app.use("/api", homeRouter());
  app.use("/api", paginationAndGettingMoviesFromRouting());
  app.use("/api", searchFormRoute());
  app.use("/api", filterFormRouter());
  app.use("/api", moviePageRouter());
  app.use("/api", qualityMovieRouter());
  app.use("/api", commentariesRouter());
  app.use("/api", googleAuth());
  app.use("/api", localAuth());
  app.use("/api/user", userIsAuthenticated, updateUserAvatar());
  app.use("/api", userIsAuthenticated, getAuthenticatedUser());
  app.use("/api/user", userIsAuthenticated, favoriteMovieUserCollections());
  app.use("/api/user", userIsAuthenticated, updateMovieRate());
  app.use("/api/user", userIsAuthenticated, updateContinueWatchMovie());
  app.use("/api/user", userIsAuthenticated, updateUsername());

  app.use((err, req, res, next) => {
    next(err);
  });
};

module.exports = routes;
