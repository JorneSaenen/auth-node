import 'dotenv/config';
import JWT from 'jsonwebtoken';
const { JWT_SECRET } = process.env;
import Auth from '../models/authModel.js';

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({
        status: 'failed',
        message: 'Unauthorized',
      });
    }

    const verified = JWT.verify(token, JWT_SECRET, {});

    const user = await Auth.findById(verified.id);
    if (!user) {
      return res
        .status(401)
        .json({ status: 'failed', message: 'Unauthorized' });
    }
    if (user) {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong oops 💩',
    });
  }
};
