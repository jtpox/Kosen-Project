import Db from '../mongo';

const ObjectId = Db.Schema.ObjectId;
const schema = Db.Schema({
  email: String,
  password: String,
  name: String,
  contact: Number,
  created_at: { type: Date, default: Date.now },
  last_updated: { type: Date, default: Date.now },
});

const User = Db.model('User', schema);

export default User;
