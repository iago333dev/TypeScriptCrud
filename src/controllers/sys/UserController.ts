import {Request, Response} from 'express';
import User,{UserInterface} from '../../models/UserModel'; 
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import url from 'url'


class UserController {
    
    //Create a token for loged user
    public CreateToken(user:UserInterface){
        return jwt.sign({id: user.id, email: user.email},config.jwtSecret, {
            expiresIn: 86400
        });
    }    

    public signUp_get = async (req: Request, res: Response) => {
        res.render('auth/signup') 
    }

    public signIn_get = async (req: Request, res: Response) => {

        const mes = req.flash('message')
        console.log(mes)
    
        if(req.query.failure=='true'){
            const message = { 
                type: 'danger',
                intro: 'Error',
                message: mes
             }
            res.render('auth/signin',{ message });
        }else{
            res.render('auth/signin');
        }
    }

/*=================================================================
                SIGIN UP POST /signup
==================================================================*/
    
    public signUp_post = async (req: Request, res: Response) => {
        
        //Validation for input email and password
        if(req.body.email == '' || req.body.password == ''){
            const message = { 
                type: 'danger',
                intro: 'Error',
                message: 'Please Insert Email and Password'
             }
            res.render('auth/signup',{ message })            
        }else{
            
        //Find registry which uses a same input email
        const user = await User.findOne({email: req.body.email});


        //If exist send erro message
        if(user){
            const message = { 
                type: 'danger',
                intro: 'Error',
                message: 'Your email alredy in our database as a user'
             }
            res.render('auth/signup',{ message })
        }else {
            //Create a new User and save
            const NewUser = new User(req.body);
            NewUser.save(); 

            //Message
            const message = { 
                type: 'success',
                intro: 'Well done!',
                message: 'You are successful registred!'
             }

             res.render('index',{ message })
        }
    }                 
}

/*=================================================================
                SIGIN POST /signin
==================================================================*/
}

export default new UserController();    


    
