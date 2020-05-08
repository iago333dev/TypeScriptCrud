import {Router} from 'express';

//<:>  Utiliza a controladora USER!! <:>
import {signIn, signUp } from '../../controllers/api/UserControllerAPI';


const router = Router();

router.post('/signup',signUp);
router.post('/signin',signIn);


export default router;