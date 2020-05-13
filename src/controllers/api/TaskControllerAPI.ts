import { Request, Response } from 'express';

import Task from '../../models/TaskModel';


class TaskControllerAPI{

    /*================================================ 
            Create New Task { POST }
    ==================================================*/                    

    public async CreateTask(req: Request, res: Response){

        //Title and Description verification
        if(!req.body.title || !req.body.description){
            return res.status(400).json({msg: 'Please, send description and title'});
        }

        //Database Save
        const { title, description } = req.body;
        const newTask = new Task({title, description});    
        await newTask.save();

        //Response
        res.send('Post Received');   
    }

    /*================================================ 
            Get All Tasks { GET }
    ==================================================*/
    public async GetTask(req: Request, res: Response){
            const tasks = await Task.find();
            res.json(tasks);              
    }

    /*================================================ 
            Delete Tasks by ID { DELETE }
    ==================================================*/
    public async DeleteTask(req: Request, res: Response){

        const { taskid } = req.params;
        await Task.findByIdAndDelete(taskid);
        res.send('Task Deleted');    
    }

    /*================================================ 
            Edit Task By ID { PATCH }
    ==================================================*/
    public async UpdateTask(req: Request, res: Response){
        const { taskid } = req.params;
        const { title,description } = req.body;
        await Task.findByIdAndUpdate(taskid, { title, description });
        
        res.send('Task Edited');
    }   
}

export default new TaskControllerAPI();