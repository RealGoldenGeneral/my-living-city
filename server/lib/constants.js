const __prod__ = process.env.NODE_ENV === 'production';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

// Rating Thresholds to advance
// Retrieve from environment and set defaults if not set
const env_proposal_rating_count = process.env.PROPOSAL_RATING_COUNT || 25;
const env_proposal_rating_avg = process.env.PROPOSAL_RATING_AVG || 3;
const env_project_rating_count = process.env.PROPOSAL_RATING_COUNT || 50;
const env_project_rating_avg = process.env.PROPOSAL_RATING_AVG || 4;

// Export as constants to be used in application
const PROPOSAL_RATING_COUNT = parseInt(env_proposal_rating_count);
const PROPOSAL_RATING_AVG = parseInt(env_proposal_rating_avg);
const PROJECT_RATING_COUNT = parseInt(env_project_rating_count);
const PROJECT_RATING_AVG = parseInt(env_project_rating_avg);

module.exports = {
  __prod__,
  JWT_SECRET,
  JWT_EXPIRY,
  PROPOSAL_RATING_AVG,
  PROPOSAL_RATING_COUNT,
  PROJECT_RATING_AVG,
  PROJECT_RATING_COUNT,
}