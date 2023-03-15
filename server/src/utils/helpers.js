import 'dotenv/config';
import JWT from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

export const loginUser = (id, email, res) => {
  try {
    const token = JWT.sign({ id, email }, JWT_SECRET, { expiresIn: '7d' });
    if (!token) {
      throw new Error('Something went wrong oops 💩');
    }
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 604800000, // 1000 * 60 * 60 * 24 * 7
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production' ? true : false,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
};
