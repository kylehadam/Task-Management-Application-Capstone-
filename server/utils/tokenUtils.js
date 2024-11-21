import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token.
 * @param {Object} payload - Data to include in the token.
 * @param {string} secret - Secret key.
 * @param {Object} options - Token options like expiration.
 * @returns {string} - JWT token.
 */
export const generateToken = (payload, secret, options = { expiresIn: '1h' }) => {
  return jwt.sign(payload, secret, options);
};

/**
 * Verify and decode a JWT token.
 * @param {string} token - JWT token.
 * @param {string} secret - Secret key.
 * @returns {Object} - Decoded payload.
 */
export const verifyAndDecodeToken = (token, secret) => {
  return jwt.verify(token, secret);
};
