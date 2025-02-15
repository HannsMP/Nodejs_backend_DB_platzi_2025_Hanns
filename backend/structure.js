const Server = require("./controllers/server");

require('dotenv').config()

class Structure {
  /** 
   * @type {{
   *   APP_PORT: number
   * }}
   */
  ENV = process.env
  
  constructor() {
    this.server = new Server(this);
    this.server.load_routes();
    this.server.run();
  }
  
}

module.exports = Structure;