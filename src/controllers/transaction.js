import { Ticket, Event, Transaction, User } from '../models';

export default {
  async update(req, res) {
    const { transactionId } = req.query;
    try {
      const options = {
        where: {
          id: transactionId
        },
      }
      await Transaction.update({status: 'success' }, options)
      res.status(200).send({ data, message: "Transaction has been created"});
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
  async all(req, res) {
    try {
      const data = await Transaction.findAll();
      res.status(200).send(data);
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
};
