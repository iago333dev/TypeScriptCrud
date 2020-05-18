import express from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars'
import path from 'path';
import indexRoutes from './routes'


import session from 'express-session'
import flash from 'connect-flash'

//Sys Routers
import taskRoutes from './routes/sys/TaskRouter'
import AuthRoutes from './routes/sys/AuthRouter'
//Api Routers
import taskRoutesAPI from './routes/api/TaskRouterAPI'
import authRoutesAPI from './routes/api/AuthRouterAPI'
import specialRoutesAPI from './routes/api/SpecialRouterAPI';

import cors from 'cors';
//import passportMiddleware from "./middlewares/passport";
import passportMiddleware from "./middlewares/passportlocal";
import passport from 'passport';

class Application {
    app: express.Application;

    constructor(){        
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
        
    }

    start(){
        this.app.listen(this.app.get('port'),() =>{
            console.log('Server Running on Port:', this.app.get('port'));
        })
    }

    settings(){
        this.app.set('port', 3000);
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('.hbs', exphbs({
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs'
        }));
        this.app.set('view engine', '.hbs');
    }

    middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());

        this.app.use(passport.initialize());        
        passport.use('local-signin',passportMiddleware);


        //Local passport        
        this.app.use(session({
            secret: 'mysecreatsession',
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(passport.session());
        this.app.use(flash());
        this.app.use((req,res,next) => {

            //res.locals.message = req.flash('message');           
           // this.app.locals.signupMessage = req.flash('signupMessage');
           // this.app.locals.user = req.user;
            //console.log(res.locals.message);
            next()
        })

        
        
        

        
        //<:> this.app.use(session({cookie: {maxAge: null}}))        
        

    }

    routes(){        
        //Sys Router
        this.app.use('/task',taskRoutes);   
        this.app.use('/',AuthRoutes); 
        this.app.use(indexRoutes);
        //API Router
        this.app.use('/api/task',taskRoutesAPI);      
        this.app.use('/api/auth',authRoutesAPI);  
        this.app.use(specialRoutesAPI);  

        this.app.use(express.static(path.join(__dirname, 'public')));
    }

}

export default Application;

