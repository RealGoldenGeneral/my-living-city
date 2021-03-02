const __prod__ = process.env.NODE_ENV === 'production';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

module.exports = {
  __prod__,
  JWT_SECRET,
  JWT_EXPIRY,

}