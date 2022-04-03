import bcrypt from 'bcryptjs';
import { User, Role } from '../models';

export default {
  async list(req, res) {
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
  async add(req, res) {
    const { username, name, email, phone, password } = req.body;
    try {
      const [data, created] = await User.findOrCreate({
        where: { username, email, phone },
        defaults: {
          name,
          password: bcrypt.hashSync(password, 10),
        }
      });
      res.status(200).send({ data, message:  created ? "Data created successfully" : "Data is exist" });
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
  async update(req, res) {
    const { id, email, name, username } = req.body;
    try {
      const [data] = await User.update({ email, name, username }, {
        where: {
          id
        }
      });
      if(!data) {
        throw Object.assign(new Error('Data does not exist'), { code: 404 });
      }
      res.status(200).send({ data, message: 'Data Updated'});
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    try {
      const data = await User.destroy({
        where: {
          id
        }
      });
      res.status(200).send({message: 'Data has been deleted'});
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
  async byId(req, res) {
    const { id } = req.body;
    try {
      const data = await User.findByPk(id, {
        attributes: ['id', 'username', 'name', 'email'],
      });
      res.status(200).send(data);
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
  async updatePassword(req, res, next) {
    const { userId, body } = req;
    const { password } = body;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    
    try {
      await User.update({ password: encryptedPassword }, { 
        where: {
          id: userId
        }
      });
      res.status(200).send({ message: 'Password telah diperbarui' });
    } catch (error) {
      res.status(error.code || 400).send({ message: error.message });
    }
  }
};
