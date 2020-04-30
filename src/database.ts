
import mongoose from 'mongoose';

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost/ietzz',{
            useNewUrlParser: true
        });
        console.log('Database Connected')
    }catch{
        console.log('MongoDB Error');
    }
}

export default connect;