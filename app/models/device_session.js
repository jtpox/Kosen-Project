import Db from '../mongo';

const ObjectId = Db.Schema.ObjectId;
const schema = Db.Schema({
  device: { type: ObjectId, ref: 'Device' },
  token: String,
  created_at: { type: Date, default: Date.now },
  last_updated: { type: Date, default: Date.now },
});

const DeviceSession = Db.model('DeviceSession', schema);

DeviceSession.fromToken = (device, token) => {
  const fields = ['device', 'token', 'created_at', 'last_updated'];
  return DeviceSession.findOne({ device, token }).select(fields.join(' '))
    .populate('device');
};

export default DeviceSession;
