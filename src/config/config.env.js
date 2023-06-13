require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  database: {
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    sid: process.env.DATABASE_SID
  },
  jwt: {
    secret: process.env.SECRET || 'key'
  }
};
