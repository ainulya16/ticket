export default (err, req, res, next) => {
  if (typeof err === 'string') {
    return res.status(400).send({ message: err });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).send({ message: 'Invalid Token' });
  }

  // default to 500 server error
  return res.status(500).send({ message: err.message });
};
