import express from 'express';
import Ticket from './controllers/ticket';
import Event from './controllers/event';
import Transaction from './controllers/transaction';

const route = express.Router();

// route.use('/event', );

// Event
route.post('/event', Event.add);
route.get('/event', Event.list); // Event List
route.delete('/event/:id', Event.delete); // Event List

route.post('/ticket/buy', Ticket.buy);

// URL Callback to update payment status by transaction ID
route.post('/transaction/success/', Transaction.update);

route.get('/transaction', Transaction.all);

route.get('/', (req, res)=>res.send('Hello'))

export default route;
