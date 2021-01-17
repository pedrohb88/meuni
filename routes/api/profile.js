const express = require('express');
const axios = require('axios');
const router = express.Router();
const auth = require('./../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('./../../models/Profile');
const User = require('./../../models/User');


// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'role']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', auth, async (req, res) => {

    const {
        city,
        state,
        birthday,
        college,
        degree,
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (city) profileFields.city = city;
    if (state) profileFields.state = state;
    if (birthday) profileFields.birthday = birthday;
    if (college) profileFields.college = college;
    if (degree) profileFields.degree = degree;

    try { 

        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            //Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields },
                {new: true}
            );

            return res.json(profile); 
        }

        //Create 
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {

    try {

        const profiles = await Profile.find().populate('user', ['name', 'role']);

        res.json(profiles);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/user/:userId
// @desc    Get profile by user id
// @access  Public
router.get('/user/:userId', async (req, res) => {
    try {

        const profile = await Profile.findOne({user: req.params.userId}).populate('user', ['name', 'role']);

        if(!profile) return res.status(400).json({msg: 'Profile not found'});

        res.json(profile);
        
    } catch (error) {
        console.error(error.message);

        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/profile/addXP
// @desc    Add profile experience points
// @access  Private
router.put('/addXP', [auth, [
    check('xp', 'XP é obrigatório').not().isEmpty(),
]], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {xp} = req.body;
    try {
        const profile = await Profile.findOne({user: req.user.id});

        profile.xp = profile.xp + xp;
        await profile.save();

        res.json(profile);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;