import { verifyAndDecodeToken } from '../utils/tokenUtils.js';
import User from '../models/User.js';
import config from '../config/config.js';

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAndDecodeToken(token, config.jwtSecret);

    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
