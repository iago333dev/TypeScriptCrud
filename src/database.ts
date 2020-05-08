import mongoose from 'mongoose';
import config from './config/config';

async function connect(){
    try{
        await mongoose.connect(config.DB.URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true 
        });
        console.log('Database Connected')
    }catch{
        console.log('MongoDB Error');
    }
}

export default connect;