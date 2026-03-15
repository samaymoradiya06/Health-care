const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register User
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, mobile, age, bloodGroup } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password, // In a real app, hash this password with bcrypt!
            mobile,
            age,
            bloodGroup,
            role: 'user' // Default to user
        });

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ msg: 'User registered successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for admin (hardcoded for now to match established logic, or can be in DB)
        if (email === 'samaymoradiya06@gmail.com' && password === 'admin123') {
            return res.json({
                msg: 'Admin logged in',
                user: {
                    name: 'Admin User',
                    email: 'samaymoradiya06@gmail.com',
                    role: 'admin'
                }
            });
        }

        // Check user in DB
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Check password (using bcrypt)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch && user.password !== password) { // fallback for plain-text if needed during dev
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        res.json({ msg: 'Logged in successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update Profile
router.put('/profile', async (req, res) => {
    try {
        const { id, name, email, mobile, age, bloodGroup, hasIllness, illnessDetails } = req.body;

        // Find user by ID
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.mobile = mobile || user.mobile;
        user.age = age || user.age;
        user.bloodGroup = bloodGroup || user.bloodGroup;
        user.hasIllness = hasIllness !== undefined ? hasIllness : user.hasIllness;
        user.illnessDetails = illnessDetails !== undefined ? illnessDetails : user.illnessDetails;

        await user.save();

        res.json({ msg: 'Profile updated', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GitHub OAuth Login Redirect
router.get('/github', (req, res) => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = 'http://localhost:5000/api/auth/github/callback';
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    res.redirect(githubAuthUrl);
});

// GitHub OAuth Callback
router.get('/github/callback', async (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).send('No code provided');
    }

    try {
        const axios = require('axios'); // Lazy load or we can put it at top

        // 1. Exchange code for access token
        const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code
        }, {
            headers: {
                Accept: 'application/json'
            }
        });

        const accessToken = tokenResponse.data.access_token;
        if (!accessToken) {
            return res.status(400).send('Failed to obtain access token');
        }

        // 2. Get GitHub User Profile
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const githubUser = userResponse.data;

        // 3. Get User Email (if not public)
        let primaryEmail = githubUser.email;
        if (!primaryEmail) {
            const emailResponse = await axios.get('https://api.github.com/user/emails', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const emails = emailResponse.data;
            const primary = emails.find(e => e.primary && e.verified);
            primaryEmail = primary ? primary.email : emails[0].email;
        }

        // 4. Find or Create User in DB
        let user = await User.findOne({ githubId: githubUser.id.toString() });
        
        if (!user) {
            // Check if user exists by email
            user = await User.findOne({ email: primaryEmail });
            if (user) {
                // Link GitHub to existing account
                user.githubId = githubUser.id.toString();
                user.avatarUrl = githubUser.avatar_url;
                await user.save();
            } else {
                // Create new user
                user = new User({
                    name: githubUser.name || githubUser.login,
                    email: primaryEmail,
                    githubId: githubUser.id.toString(),
                    avatarUrl: githubUser.avatar_url,
                    role: 'user'
                });
                await user.save();
            }
        }

        // 5. Redirect to frontend with user data (In a real app use secure sessions/JWT)
        // Convert user to base64 or URL encoded string so frontend can pick it up
        const userData = Buffer.from(JSON.stringify(user)).toString('base64');
        res.redirect(`http://localhost:5000/pages/oauth-success.html?data=${userData}`);

    } catch (err) {
        console.error('GitHub OAuth Error:', err.message);
        res.status(500).send('GitHub Authentication Failed');
    }
});

// Check Health Profile Status (for nudges)
router.get('/health-profile-status/:userId', async (req, res) => {
    try {
        const User = require('../models/User');
        const Report = require('../models/Report');
        
        const user = await User.findById(req.params.userId);
        const reportCount = await Report.countDocuments({ userId: req.params.userId });
        
        res.json({
            hasIllnessData: !!(user.hasIllness || user.illnessDetails),
            hasReports: reportCount > 0
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
