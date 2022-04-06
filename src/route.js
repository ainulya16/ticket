import express from 'express';
import Ticket from './controllers/ticket';
import Event from './controllers/event';

const route = express.Router();

// route.use('/event', );

// Event
route.post('/event', Event.add);
route.put('/event', Event.update); // Update Event
route.get('/event', Event.list); // Event List

route.post('/ticket/buy', Ticket.buy);

// URL Callback to update payment status by transaction ID
route.post('/transaction/success/:transactionId', Event.add);

route.get('/', (req, res)=>res.send('Hello'))

export default route;
