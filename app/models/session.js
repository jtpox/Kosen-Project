import Db from '../mongo';

const ObjectId = Db.Schema.ObjectId;
const schema = Db.Schema({
  user: { type: ObjectId, ref: 'User' },
  session_token: String,
  created_at: { type: Date, default: Date.now },
  last_updated: { type: Date, default: Date.now },
});

const Session = Db.model('Session', schema);

export default Session;
