import Index from '../controllers/web/index';

module.exports = (app) => {
  // const index = new Index();

  app.get('/', Index.index);
};
