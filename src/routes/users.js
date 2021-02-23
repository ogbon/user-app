import Router from 'express'
import userController from '../controllers/user'
const userRouter = Router()

userRouter.route('/')
 .get(userController.getAll)
 .post(userController.create)

export default userRouter
