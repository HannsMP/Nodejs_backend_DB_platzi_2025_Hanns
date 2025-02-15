const { Client } = require('pg');

class Postgres {
  constructor(){
    
  }

  #connect(){
    new Client({
      host: 'localhost',
      port: 5432,
      user: 'nico',
      password: 'admin',
      database: 'my_store'
    })
  }

  static connect() {
    this.client.connect();
  }
}

module.exports = Postgres;
