import Auth from '../models/authModel.js';
import bcrypt from 'bcrypt';
import { loginUser } from '../utils/helpers.js';
const saltRounds = 10;

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await Auth.findOne({ email });
    if (exist) {
      return res.status(409).json({
        status: 'failed',
        message: 'Email allready exists',
      });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // insert in db
    const user = await Auth.create({
      email,
      password: hashedPassword,
    });

    // log the user in
    loginUser(user._id, user.email, res);

    res.status(201).json({
      status: 'success',
      message: 'User successfuly created & logged in',
      user: {
        id: user._id,
        email,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Credentials not correct',
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        status: 'failed',
        message: 'Credentials not correct',
      });
    }
    loginUser(user._id, email, res);

    res.status(200).json({
      status: 'success',
      message: 'User successfuly logged in',
      user,
    });
  } catch (error) {
    console.error(error);
  }
};
const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { expires: new Date(0) });
    res.status(200).json({
      status: 'success',
      message: 'User successfully logged out',
    });
  } catch (error) {
    console.error(error);
  }
};
const isAuthFunc = (req, res) => {
  try {
    res.json({
      status: 'success',
      user: {
        email: req.user.email,
        id: req.user._id,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export { isAuthFunc, register, login, logout };
