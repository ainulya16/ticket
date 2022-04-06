import { Ticket, Event, Transaction, User } from '../models';

export default {
  async buy(req, res) {
    const { eventId, username, email, phone } = req.body;
    try {
      const event = await Event.findOne({ where: { id: eventId } })
      console.log(event)
      if(!event) {
        res.status(400).send({ message: "Event does not exist"});
        return;
      }

      const user = await User.findOrCreate({
        where: { name: username, email, phone },
        defaults: {
          name: username,
          email,
          phone
        }
      });

      const transactionParams = {
        eventId,
        userId: user.id,
        amount: event.price,
      }
      
      const transaction = await Transaction.create(transactionParams)
      await Ticket.create({
        userId: user.id,
        eventId,
        transactionId: transaction.id,
        status: 'inactive'
      });
      const data = {
        transactionId: transaction.id,
        detail: "Tiket " + event.name,
        amount: transaction.amount
      }
      res.status(200).send({ data, message: "Transaction has been created"});
    } catch (error) {
      res.status(error.code || 400).send(error.message);
    }
  },
};
