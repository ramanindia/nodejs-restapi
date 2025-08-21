import { Router } from 'express';
import { registerUser,loginUser, getProfile,  } from '../controllers/user';
import { validate } from "../../middlewares/validate";
import { verifyToken, AuthenticatedRequest } from '../../middlewares/jwt';
import { registerUserSchema,loginUserSchema } from "../schemas/user";

const router = Router();
//router.get('/', getUsers);
router.get('/getprofile',verifyToken, getProfile);
router.post('/registerUser',validate(registerUserSchema), registerUser);
router.post('/login',validate(loginUserSchema), loginUser);
//router.put('/:id', updateUser);
//router.delete('/:id', deleteUser);

export default router;
