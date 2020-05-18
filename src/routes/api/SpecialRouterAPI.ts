import { Router } from 'express';
import {Request, Response} from 'express';
import passport from 'passport';



const router = Router();

//Router special which uses passport authenticate

//API ROUTE AUTHENTICATION
router.get('/api/special', passport.authenticate('jwt', { session: false }), (req,res) =>{
    res.send('sucess');
})

//SYS ROUTE AUTHENTICATION
router.post('/special', passport.authenticate('local-signin', { 
    successRedirect: '/',
    failureRedirect: '/signin?failure=true',
    failureFlash: true

}));



export default router;