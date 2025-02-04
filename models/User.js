import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const ReadingListSchema = new Schema({
  bookRefId: { type: Types.ObjectId, ref: 'Book', required: true },
  status: { type: String, enum: ['read', 'pending'], required: true },
});

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  readingList: [ReadingListSchema],
});

const User = model('User', UserSchema);
export default User;
