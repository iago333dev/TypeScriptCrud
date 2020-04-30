import { Schema, model, Document } from 'mongoose';

//Defines Class Properties
interface TaskInterface extends Document{
    title: String
    description: String;
}

//Define DATABASE format
const TaskSchema = new Schema({
    title:{
        type: String,
        required: true,
        lowercase: true

    },
    description:{
        type: String,
        required: true,
        lowercase: true
    }
});

export default model<TaskInterface>('Task', TaskSchema);