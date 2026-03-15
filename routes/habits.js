const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');
const HabitConfig = require('../models/HabitConfig');

// --- Habit Configurations ---
router.get('/config/:userId', async (req, res) => {
    try {
        const configs = await HabitConfig.find({ userId: req.params.userId });
        res.json(configs);
    } catch (err) { res.status(500).send('Server Error'); }
});

router.post('/config', async (req, res) => {
    try {
        const { userId, habitName, targetValue, unit, reminderTime } = req.body;
        let config = await HabitConfig.findOne({ userId, habitName });
        if (config) {
            config.targetValue = targetValue;
            config.reminderTime = reminderTime;
        } else {
            config = new HabitConfig({ userId, habitName, targetValue, unit, reminderTime });
        }
        await config.save();
        res.json(config);
    } catch (err) { res.status(500).send('Server Error'); }
});

// --- Habit Tracking ---
// Get Habits for User
router.get('/:userId', async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.params.userId });

        // Transform to object keyed by date for frontend compatibility
        const habitsMap = {};
        habits.forEach(h => {
            habitsMap[h.date] = h;
        });

        res.json(habitsMap);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update Habit
router.post('/update', async (req, res) => {
    try {
        const { userId, date, type, value, isDirect } = req.body;

        let habit = await Habit.findOne({ userId, date });

        if (!habit) {
            habit = new Habit({ userId, date });
        }

        // Update specific field
        if (type === 'medicine') {
            habit.medicine = value;
        } else if (isDirect) {
            habit[type] = value;
        } else {
            habit[type] = (habit[type] || 0) + value;
            if (habit[type] < 0) habit[type] = 0;
        }

        await habit.save();
        res.json(habit);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
