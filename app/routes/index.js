module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({
      test: 1,
    });
  });
};
