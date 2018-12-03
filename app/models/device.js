import Db from '../mongo';

const ObjectId = Db.Schema.ObjectId;
const schema = Db.Schema({
  name: String,
  user: { type: ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now },
  last_updated: { type: Date, default: Date.now },
});

const Device = Db.model('Device', schema);

export default Device;
