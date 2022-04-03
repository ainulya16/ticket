import { Op } from 'sequelize';
import { Tag, Event, EventTag, EventProduct } from '../models';

export default {
  async list(req, res) {
    try {
      const { query } = req;
      const { limit, offset, ...args } = query;
      const options = { where: args, limit, offset };
      const data = await Event.findAll(options);
      res.status(200).send(data);
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
  async byTag(req, res) {
    try {
      const { tagId } = req.params;
      const include = [
        {
          model: Tag,
          as: 'tags',
          attributes: ["name"],
          through: {
            where: {
              tagId
            }
          }
        }
      ]
      const attributes = ["id", "name", "image", "description"]
      const options = { include, attributes };
      const data = await Event.findAll(options);
      res.status(200).send(data);
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
  async listTags(req, res) {
    try {
      const { query } = req;
      const { limit, offset, ...args } = query;
      const include = [
        {
          model: Tag,
          as: 'tags',
        }
      ]
      const options = { include, attributes: ["id", "name"] };
      const data = await Event.findAll(options);
      res.status(200).send(data);
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
  async add(req, res) {
    const {
      name,
      image,
      description,
      tags
    } = req.body;
    try {
      const [data, created] = await Event.findOrCreate({
        where: { name },
        defaults: {
          name,
          image,
          description
        }
      });
      const eventId = data.id;
      let tagsData = [];
      if (Array.isArray(tags) && tags.length > 0) {
        const newTags = tags.map((tagId) => { return { tagId, eventId } });
        tagsData = await EventTag.bulkCreate(newTags,
          {
            fields: ["eventId", "tagId"],
            updateOnDuplicate: ["eventId", "tagId"]
          });
        
      }
      res.status(200).send({ data: {...data, newTags: tagsData }, message: created ? "Data created successfully" : "Data is exist" });
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
  async update(req, res) {
    const {
      id,
      name,
      image,
      description,
      tags
    } = req.body;

    try {
      const [data] = await Event.update({
        name,
        image,
        description
      }, {
        where: {
          id
        }
      });
      
      if (!data) {
        throw Object.assign(new Error('Data does not exist'), { code: 404 });
      }

      let tagsData = [];
      if (Array.isArray(tags) && tags.length > 0) {
        const newTags = tags.map((tagId) => { return { tagId, eventId } });
        tagsData = await EventTag.bulkCreate(newTags,
          {
            fields: ["eventId", "tagId"],
            updateOnDuplicate: ["eventId", "tagId"]
          });
        
      }
      res.status(200).send({ data, message: 'Data Updated' });
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
  async addTag(req, res) {
    const {
      eventId,
      tagId,
    } = req.body;
    try {
      const [data, created] = await EventTag.findOrCreate({
        where: {
          [Op.and]: [
            { eventId },
            { tagId }
          ]
        },
        defaults: {
          eventId,
          tagId,
        }
      });
      res.status(200).send({ data, message: created ? "Data created successfully" : "Data is exist" });
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
  async addProduct(req, res) {
    const {
      productId,
      eventId,
    } = req.body;
    try {
      const [data, created] = await EventProduct.findOrCreate({
        where: {
          [Op.and]: [
            { productId },
            { eventId }
          ]
        },
        defaults: {
          productId,
          eventId,
        }
      });
      res.status(200).send({ data, message: created ? "Data created successfully" : "Data is exist" });
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
};
