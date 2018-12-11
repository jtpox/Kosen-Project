import Fs from 'fs';

import Exphbs from 'express-handlebars';

export default class Kosen {
  constructor(express) {
    this.express = express;
    this.app = express();

    /*
     * Set template engine.
     * https://github.com/ericf/express-handlebars
     */
    // this.app.engine('handlebars', Exphbs({ defaultLayout: 'main' }));
    this.app.engine('handlebars', Exphbs.create().engine);
    this.app.set('view engine', 'handlebars');

    this.start();
  }

  async start() {
    this.loadRoutes();
    this.app.use(this.express.static('public'));
    this.app.listen(process.env.PORT, () => {
      console.log(`Web Server Started on port ${process.env.PORT}`);
    });
  }

  async loadRoutes() {
    const routes = this.getRouteFiles();
    // console.log(routes);
    routes.forEach((file) => {
      // console.log(file);
      /* eslint-disable */
      require(`./routes/${file}`)(this.app);
      /* eslint-enable */
    });
  }

  getRouteFiles() {
    return Fs.readdirSync('./app/routes');
  }
}
