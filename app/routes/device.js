import Auth from '../middlewares/web/auth';

import Device from '../controllers/web/device';

module.exports = (app) => {
  app.get('/api/device', Auth.isLogged, Device.list);

  app.get('/api/device/location/:id', Auth.isLogged, Device.location);

  // Body: device_id:xxx
  app.post('/api/device/add', Auth.isLogged, Device.add);
};
