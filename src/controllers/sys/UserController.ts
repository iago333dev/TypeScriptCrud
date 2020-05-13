import { Request, Response } from 'express';
import User from '../../models/UserModel';

class UserController { 

    public signUp_get = async (req: Request, res: Response) => {
        res.render('auth/signup') 
    }
    
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
}

export default new UserController();    


    
