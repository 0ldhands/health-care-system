// small helper to wrap async route handlers and forward errors to the
// centralized error middleware instead of having to put try/catch in every
// controller method.

module.exports = fn => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
