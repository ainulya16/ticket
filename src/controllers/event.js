import { Event } from '../models';

export default {
  async list(req, res) {
    try {
      const { limit, offset } = req.query;
      const options = { limit, offset };
      const data = await Event.findAll(options);
      res.status(200).send(data);
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
  async add(req, res) {
    const {
      name,
      quota,
      price,
      eventDate = Date.now()
    } = req.body;
    try {
      const [data, created] = await Event.findOrCreate({
        where: { name },
        defaults: {
          name,
          quota,
          price,
          eventDate
        }
      });
      if (!created) {
        res.status(409).send({ data, message: "Data is exist" });
      }
      res.status(200).send({ data, message: created ? "Data created successfully" : "Data is exist" });
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    try {
      await Event.destroy({
        where: {
          id
        }
      });
      res.status(200).send({ message: 'Data has been deleted' });
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
  async byId(req, res) {
    const { id } = req.body;
    try {
      const data = await Event.findByPk(id);
      res.status(200).send(data);
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
};
