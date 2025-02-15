const cors = require('cors');

const Route = require("../utils/template/Route");

const whitelist = new Set([
  'http://localhost:8080',
  'https://myapp.co'
]);

module.exports = new Route()
  .use(cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.has(origin)) 
       return callback(null, true);

      callback(new Error('no permitido'));
    }
  }))
