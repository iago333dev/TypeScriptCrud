import { Request, Response } from 'express';

import Task from '../models/TaskModel';

class TaskController{
    //Render Form for Create a new Task
    public async CreateTask_get(req: Request, res: Response){
        res.render('task/create');        
    }

    //Save Form sended from user
    public async CreateTask_post(req: Request, res: Response){
        const { title, description } = req.body;
        const newTask = new Task({title, description});    
        await newTask.save();
        res.redirect('list');      
    }

    //Get All task in databse
    public async GetTask(req: Request, res: Response){
        const tasks = await Task.find();
        res.render('task/list', { tasks });              
    }

    //Delete Task by id
    public async DeleteTask(req: Request, res: Response){
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.redirect('/task/list');    
    }

    //Get Edit Task form from id
    public async EditTask_get(req: Request, res: Response){
        const { id } = req.params;
        const task = await Task.findById(id);        
        res.render('task/edit', { task });    
    }

    //Get Edit Task form from id
    public async EditTask_post(req: Request, res: Response){
        const { id } = req.params;
        const { title,description } = req.body;
        await Task.findByIdAndUpdate(id, { title, description });
        res.redirect('/task/list');   
    }
}

export default  new TaskController();