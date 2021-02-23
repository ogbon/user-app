import { User } from '../../db/models/'
import {pagination, totalPage} from '../helpers/tools'

const userController = {
  getAll: async (req, res) => {
    const { page } = req.query
    try {
      const users = await User.findAndCountAll({
        ...pagination(page),
        order: [['createdAt', 'DESC']]
      })
      return res.status(200).send({
        data: users.rows, 
        count: users.count, 
        currentPage: parseInt(page && page.number, 10) || 1,
        totalPage: totalPage(users.count, (page && page.size))
      })
    }catch (error) {
      return res.status(422).send({message: 'Unable to fetch users'})
    }
  },
  create: async (req, res) => {
    const { email } = req.body
    try {
      const existingUser = await User.findOne({where: { email: email}})
      if(existingUser) {
        throw new Error("There is an existing user with provided email")
      }
      const user = await User.create(req.body)
      return res.status(201).send({ data: user })
    }catch (error) {
      if (error.message === "There is an existing user with provided email") {
        return res.status(400).send({
          message: 'There is an existing user with provided email'
        })
      }
      return res.status(422).send({message: 'Unable to create user'})
    }
  }
}

export default userController
