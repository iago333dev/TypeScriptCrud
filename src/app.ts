import express from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars'
import path from 'path';
import indexRoutes from './routes'
//Sys Routers
import taskRoutes from './routes/sys/TaskRouter'
//Api Routers
import taskRoutesAPI from './routes/api/TaskRouterAPI'
import cors from 'cors';

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
    }

    routes(){
        this.app.use(indexRoutes);
        //Sys Router
        this.app.use('/task',taskRoutes);   
        //API Router
        this.app.use('/api/task',taskRoutesAPI);      
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

}

export default Application;