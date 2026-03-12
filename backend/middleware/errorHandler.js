// Centralized Express error handler
// Place after all routes in server.js

module.exports = function errorHandler(err, req, res, next) {
  // if headers sent, delegate to default express handler
  if (res.headersSent) {
    return next(err);
  }

  console.error("Unhandled error:", err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    error: message
  });
};
