
export const sessionChecker = (req, res, next) => {
    if (req.session && req.session.user) {
      next(); // User is authenticated, proceed to the next middleware or route
    } else {
      res.status(401).json({ error: 'Unauthorized access. Please log in.' });
    }
  };
  