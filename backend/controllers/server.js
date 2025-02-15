const express = require('express');
const { resolve, join } = require('path');
const { readdirSync } = require('fs');

const Route = require('../utils/template/Route');

const {
  logErrors,
  errorHandler,
  boomErrorHandler
} = require('../middlewares/error.handler');

class Server {
  app = express();
  /** @type {Map<string, Route>}  */
  routes = new Map
  /** @param {import('../structure')} structure  */
  constructor(structure) {
    this.structure = structure;

    this.app.use(express.json());
    this.app.use(logErrors);
    this.app.use(errorHandler);
    this.app.use(boomErrorHandler);
  }

  load_routes(current_path = resolve('backend', 'routes')) {
    readdirSync(current_path, { recursive: true })
      .filter(d => d.endsWith('.js'))
      .map(d => join(current_path, d))
      .forEach(p => {
        let route = require(p);
        if (!(route instanceof Route))
          return;

        if (!route.state)
          return;

        route.bind(this.structure);
        this.routes.set(route.endPoint, route);
        console.log(`Ruta cargada ${route.endPoint}`);
        
        if (route.data.USE.length)
          this.app.use(route.endPoint, route.data.USE);

        if (route.data.GET.length)
          this.app.get(route.endPoint, route.data.GET);

        if (route.data.POST.length)
          this.app.post(route.endPoint, route.data.POST);

        if (route.data.PUT.length)
          this.app.put(route.endPoint, route.data.PUT);

        if (route.data.PATCH.length)
          this.app.patch(route.endPoint, route.data.PATCH);

        if (route.data.DELETE.length)
          this.app.delete(route.endPoint, route.data.DELETE);
      })
  }

  run() {
    this.app.listen(this.structure.ENV.APP_PORT, err => {
      if (err)
        throw err;

      console.log(`Server encendido en localhost:${this.structure.ENV.APP_PORT}`);
    })
  }
}

module.exports = Server;

// app.get('/', (req, res) => {
//   res.send('Hola mi server en express');
// });

// app.get('/nueva-ruta', (req, res) => {
//   res.send('Hola, soy una nueva ruta');
// });

// routerApi(app);

// app.use(logErrors);
// app.use(boomErrorHandler);
// app.use(errorHandler);