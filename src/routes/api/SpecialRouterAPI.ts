import { Router } from 'express';
import {Request, Response} from 'express';
import passport from 'passport';



const router = Router();

//Router special which uses passport authenticate
/*
router.get('/special', passport.authenticate('jwt', { session: false }), (req,res) =>{
    res.send('sucess');
})
*/

router.post('/special', passport.authenticate('local-signin', { 
    successRedirect: '/',
    failureRedirect: '/signin?failure=true',
    failureFlash: true

}));



export default router;