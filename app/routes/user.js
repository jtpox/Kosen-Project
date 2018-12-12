import Authenticate from '../controllers/web/authenticate';

module.exports = (app) => {
  // const index = new Index();

  // Body: email:xxx, password:xxx, name:xxx, contact:xxx
  app.post('/api/register', Authenticate.register);

  // Body: email:xxx, password:xxx
  app.post('/api/login', Authenticate.login);
};
