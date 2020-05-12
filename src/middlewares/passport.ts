import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import config from '../config/config';
import user from '../models/UserModel'

//<:>
const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

export default new Strategy(opts,(payload,done) =>{
    //Find user's account
    const User = user.findById(payload.id);
    try {        
        if(User){
            return done(null, User);
        }        
    return done(null, false);         
    } catch (error) {
        console.log(error)      
    }
})