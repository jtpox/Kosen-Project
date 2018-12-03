import Db from '../mongo';

const ObjectId = Db.Schema.ObjectId;
const schema = Db.Schema({
  device: { type: ObjectId, ref: 'Device' },
  session_token: String,
  created_at: { type: Date, default: Date.now },
  last_updated: { type: Date, default: Date.now },
});

const DeviceSession = Db.model('DeviceSession', schema);

export default DeviceSession;
