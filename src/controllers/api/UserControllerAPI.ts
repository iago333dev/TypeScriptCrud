import {Request, Response} from 'express';
import User,{UserInterface} from '../../models/UserModel';   
import jwt from 'jsonwebtoken';
import config from '../../config/config';

//<:>

//Create a token for loged user
function CreateToken(user:UserInterface){
    return jwt.sign({id: user.id, email: user.email},config.jwtSecret, {
        expiresIn: 86400
    });
}

/*==========================================
            NEW USER /api/auth/signup
===========================================*/
export const signUp = async (req: Request, res: Response): Promise<Response> => {
    
    //check if exist email and password fields on request
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            msg: 'Please Send you email and password'
        })
    }
    
    //Find registry which uses a same input email
    const user = await User.findOne({email: req.body.email});

    //If exist send erro message
    if(user){
        return res.status(400).json({
            msg: 'Your email alredy in our database as a user'
        })
    }

    //Create a new User and save
    const NewUser = new User(req.body);
    NewUser.save();

    //Return user object
    return res.status(201).json(NewUser);
}

export const signIn = async (req: Request, res: Response) => {
    //check if exist email and password fields on request
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            msg: 'Please Send you email and password'
        })
    }  
    
    //Find registry which uses a same input email
    const user = await User.findOne({email: req.body.email});  
    
    //If not exist send erro message
    if(!user){
        return res.status(400).json({
            msg: 'User dont exist'
        })
    }
    
    //Check password
    const ismatch = await user.comparePassword(req.body.password);

    //If its match create a token 
    if (ismatch){        
        return res.status(200).json({
            token: CreateToken(user)
        })        
    }

    //else send a erro message
    return res.status(400).json({
        msg: 'Email or password incorrect'
    })
    
    
}