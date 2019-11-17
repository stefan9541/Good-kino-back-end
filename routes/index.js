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
const getAuthenticatedUser = require("./get-authenticated-user");
const updateFavoriteMovieUserCollections = require("./user-add-favorite-movie");

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
  app.use("/api", userIsAuthenticated, getAuthenticatedUser());
  app.use("/api/user", userIsAuthenticated, updateFavoriteMovieUserCollections());

  app.use((err, req, res, next) => {
    next(err);
  });
};

module.exports = routes;
