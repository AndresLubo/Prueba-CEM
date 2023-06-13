const config = require("./config/config.env");
const { createApp } = require('./app');

const app = createApp();

app.listen(config.port, () => console.log('Aplicación corriendo'))
