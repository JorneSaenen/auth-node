import express from 'express';
import { isAuth } from '../middleware/authMiddleware.js';
import {
  isAuthFunc,
  register,
  login,
  logout,
} from '../controllers/authController.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/isAuth', isAuth, isAuthFunc);

export default router;
