import Fs from 'fs';

import Exphbs from 'express-handlebars';

import BodyParser from 'body-parser';

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

    this.app.enable('trust proxy', true);
    this.app.use(BodyParser.urlencoded({ extended: true }));
    this.app.use(BodyParser.json());

    this.start();
  }

  async setHeaders() {
    this.app.use((req, res, next) => {
      // Enable CORS
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authentication');
      
      next();
    });
  }

  async start() {
    this.setHeaders();
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
