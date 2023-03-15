import mongoose from 'mongoose';

const AuthSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  { collection: 'auth' }
);

const AuthClient = mongoose.model('auth', AuthSchema);

export default AuthClient;
