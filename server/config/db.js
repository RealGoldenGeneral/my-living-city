module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'mylivingcity',
    host: '127.0.0.1' || 'localhost' || '*',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};

