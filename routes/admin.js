const express = require('express');
const router = express.Router();
const Requirement = require('../models/Requirement');
const User = require('../models/User');
const Tip = require('../models/Tip');

// --- User Management ---
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// --- Tip Management ---
router.get('/tips', async (req, res) => {
    try {
        const tips = await Tip.find().sort({ createdAt: -1 });
        res.json(tips);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/tips', async (req, res) => {
    try {
        const { text, category, icon } = req.body;
        const newTip = new Tip({ text, category, icon });
        await newTip.save();
        res.json(newTip);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.delete('/tips/:id', async (req, res) => {
    try {
        await Tip.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Tip removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
