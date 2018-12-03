import Db from '../mongo';

const ObjectId = Db.Schema.ObjectId;
const schema = Db.Schema({
  device: { type: ObjectId, ref: 'Device' },
  lat: String,
  lon: String,
  created_at: { type: Date, default: Date.now },
  last_updated: { type: Date, default: Date.now },
});

const Gps = Db.model('Gps', schema);

export default Gps;
