import express from 'express';
import User from './controllers/user';
import Event from './controllers/event';

const route = express.Router();

route.post('/user', User.add);
route.get('/user', User.list);
route.get('/user/:id', User.byId);
route.put('/user/', User.update);
route.delete('/user/:id', User.delete);

// route.use('/event', );

// Event
route.post('/event', Event.add);
route.put('/event', Event.update); // Update Event
route.get('/event', Event.list); // Event List
route.get('/event/:id', Event.byId); // Detail Event

route.get('/ticket/byEvent/:id', Event.add);
route.post('/ticket/buy', Event.add);

// URL Callback to update payment status by transaction ID
route.post('/payment/:transactionId', Event.add);

route.get('/', (req, res)=>res.send('Hello'))

export default route;
