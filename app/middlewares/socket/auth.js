import DeviceSession from '../../models/device_session';

async function isLogged(device, token) {
  // const check = await DeviceSession.fromDevice(device);
  try {
    const check = await DeviceSession.findOne({ device });
    if (token === check.token) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
}

module.exports = { isLogged };
