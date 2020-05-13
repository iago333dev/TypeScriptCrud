import { Router } from 'express';
import UserController from '../../controllers/sys/UserController';

const router = Router();

router.get('/signup',UserController.signUp_get);
router.post('/signup',UserController.signUp_post);

export default router;