const __prod__ = process.env.NODE_ENV === 'production';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

// Rating Thresholds to advance
const PROPOSAL_RATING_COUNT = 25;
const PROPOSAL_RATING_AVG = 3;

const PROJECT_RATING_COUNT = 50;
const PROJECT_RATING_AVG = 4;

module.exports = {
  __prod__,
  JWT_SECRET,
  JWT_EXPIRY,
  PROPOSAL_RATING_AVG,
  PROPOSAL_RATING_COUNT,
  PROJECT_RATING_AVG,
  PROJECT_RATING_COUNT,
}