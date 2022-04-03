import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models';
import { Op } from 'sequelize';

export default {
  async login(username, password) {
    const user = await User.findOne({ where: {
      [Op.or]: [
        { username },
        { email: username }
      ]
    } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const data = await User.findByPk(user.id, {
        attributes: ['id', 'username', 'name'],
      });
      const token = jwt.sign({ sub: data }, '123456');
      return { data, token };
    }
    throw Object.assign(new Error('Username/password tidak cocok'), { code: 401 });
  },

  async generateToken(email) {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const token = jwt.sign({ sub: user }, '123456');
      return token;
    }
    throw Object.assign(new Error('Email tidak terdaftar'), { code: 400 });
  }
};
