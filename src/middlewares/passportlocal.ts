import passport from 'passport'
import {Strategy} from 'passport-local'
import { UserInterface } from '../models/UserModel'
import user from '../models/UserModel'
import {Response} from 'express'



//<:>

passport.serializeUser((user:UserInterface,done) =>{
    done(null,user.id)
})


passport.deserializeUser(async (id,done) =>{
    const User = await user.findById(id);
    done(null,User)
})

/*
export default passport.use(new Strategy(function(username, password, done) {
    user.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.comparePassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }))
*/  

  export default new Strategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password',
  },async (req, email, password,done) =>{

    //Find User from email
    const User = await user.findOne({ email: email });

    //If dont exist user
    if(!User){
       return done(null,false,req.flash('message', 'User not found'))
    };  
    
    if(!await User.comparePassword(password)){ return done(null,false,req.flash('message', 'Incorret Password'))};
    
    return done(null,User);

    //if(await User.comparePassword(password)){ }



  })



