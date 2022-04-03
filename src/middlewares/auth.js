import jwt from 'jsonwebtoken';

export default {
  validateToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(401);
    return jwt.verify(token, '123456', (error, user) => {
      // if (error) res.sendStatus(401);
      // req.userId = user.sub.id;
      next();
    });
  }
};
