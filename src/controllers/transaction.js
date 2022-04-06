import { Transaction, Ticket } from '../models';
import { v4 } from 'uuid';

export default {
  async update(req, res) {
    const { transactionId } = req.query;
    try {
      const code = v4();
      const options = {
        where: {
          id: transactionId
        },
      }
      await Ticket.update({ code, status: 'active' }, { where: { transactionId }})
      await Transaction.update({
        status: 2 // success 
      }, options)
      res.status(200).send({ message: "Transaction has been created"});
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
