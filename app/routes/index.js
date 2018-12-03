import Index from '../controllers/index';

module.exports = (app) => {
  // const index = new Index();

  app.get('/', Index.index);
};
