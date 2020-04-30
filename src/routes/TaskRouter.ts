import { Router } from 'express';

const router = Router();

//MODEL & CONTROLLER
import TaskController from '../controllers/TaskController';

//Show Form to Create new task
router.get('/create',TaskController.CreateTask_get);

//Store created task
router.post('/create',TaskController.CreateTask_post);

//Get all task created
router.get('/list',TaskController.GetTask);

//Delete Task
router.get('/delete/:id',TaskController.DeleteTask)

//Show Edit form
router.get('/edit/:id',TaskController.EditTask_get)

//Save task edited
router.post('/edit/:id',TaskController.EditTask_post)

export default router;