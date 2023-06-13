const oracledb = require('oracledb');
const boom = require('@hapi/boom')
const config = require('../config/config.env');

const dbConfig = {
  user: config.database.username,
  password: config.database.password,
  connectString: `${config.database.host}:${config.database.port}/${config.database.sid}`
};


const connectionDB = async () => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('Conexión exitosa a Oracle.');
    return connection;
  } catch (error) {
    throw boom.internal();
  }
}

module.exports = { connectionDB };
