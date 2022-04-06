import bcrypt from 'bcryptjs';
import { User, Role } from '../models';

export default {
  async buy(req, res) {
    try {
      const { query } =  req;
      const { limit, offset, ...args } =  query;
      const options = { where: args, limit, offset, include: [{model: Role, as: 'role'}] };
      const data = await User.findAll(options);
      res.status(200).send(data);
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
};
