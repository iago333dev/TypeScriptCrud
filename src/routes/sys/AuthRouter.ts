import { Router } from 'express';
import UserController from '../../controllers/sys/UserController';

const router = Router();

router.get('/signup',UserController.signUp_get);
router.post('/signup',UserController.signUp_post);

router.get('/signin',UserController.signIn_get);
//router.post('/signin',UserController.signIn_post);

export default router;