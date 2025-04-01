const express = require('express');
const Product = require('../module/inventroy');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Access Denied' });
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});

router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Access Denied' });
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
});

router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Access Denied' });
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
});

router.get('/', auth, async (req, res) => res.json(await Product.find()));
router.get('/:id', auth, async (req, res) => res.json(await Product.findById(req.params.id)));

module.exports = router;
