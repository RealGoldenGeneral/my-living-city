var API_URL = "http://localhost:3001"
if (process.env.NODE_ENV === "production") {
  API_URL = process.env.REACT_APP_PRODUCTION_API
}

module.exports = API_URL
