require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middleware/auth');

const Inventory = require('./models/Inventory');

const app = express();
app.use(cors());
app.use(express.json());

 
mongoose.connect(process.env.MONGO_INVENTORY_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Inventory Service Connected to DB'))
    .catch(err => console.error(err));

 
app.post('/inventory', auth, async (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Access Denied' });

    const product = new Inventory(req.body);
    await product.save();
    res.json(product);
});

 
app.get('/inventory', auth, async (req, res) => {
    res.json(await Inventory.find());
});

 
app.get('/inventory/:id', auth, async (req, res) => {
    res.json(await Inventory.findById(req.params.id));
});

 
app.put('/inventory/:id', auth, async (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Access Denied' });

    const product = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
});

 
app.delete('/inventory/:id', auth, async (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Access Denied' });

    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
});

const PORT = process.env.INVENTORY_PORT || 5002;
app.listen(PORT, () => console.log(`Inventory Service running on port ${PORT}`));
