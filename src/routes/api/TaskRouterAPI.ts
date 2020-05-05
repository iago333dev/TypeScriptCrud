import { Router } from 'express';

const router = Router();

//CONTROLLER <:>
import TaskControllerAPI from '../../controllers/api/TaskControllerAPI';

//Create a Task
router.post('/',TaskControllerAPI.CreateTask);

//Get all Task
router.get('/',TaskControllerAPI.GetTask);

//Delete Task By ID
router.delete('/:taskid',TaskControllerAPI.DeleteTask);

//Update a Task By ID
router.patch('/:taskid',TaskControllerAPI.UpdateTask);

export default router;