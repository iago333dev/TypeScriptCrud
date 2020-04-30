import { Router, Request, Response } from 'express';

const router = Router();

//MODEL
import Task from '../models/task'
import task from '../models/task';

//Crete Form Render
router.route('/create')
.get((req: Request, res: Response)=>{
    res.render('task/create');
})
//Create Form Input
.post(async(req: Request, res: Response) => {
    const { title, description } = req.body;
    const newTask = new Task({title, description});    
    await newTask.save();
    res.redirect('list');
});

//Read
router.route('/list')
.get(async (req: Request, res: Response)=>{
    const tasks = await Task.find();
    console.log(tasks);
    res.render('task/list', { tasks });
});

//Delete
router.route('/delete/:id')
.get(async (req: Request, res: Response)=>{
    const { id } = req.params;
    await task.findByIdAndDelete(id);
    res.redirect('/task/list');

})

//Edit
router.route('/edit/:id')
    .get(async (req: Request, res: Response)=>{
        const { id } = req.params;
        const task = await Task.findById(id);        
        res.render('task/edit', { task });
    })
    .post(async(req: Request, res: Response) => {
        const { id } = req.params;
        const { title,description } = req.body;
        await Task.findByIdAndUpdate(id, { title, description });
        res.redirect('/task/list');

    });

export default router;