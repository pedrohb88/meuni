const express = require('express');
const axios = require('axios');
const router = express.Router();
const auth = require('./../../middleware/auth');
const { check, validationResult } = require('express-validator');

const College = require('./../../models/College');
const Location = require('./../../models/Location');
const Info = require('./../../models/Info');

// @route   GET api/college/:collegeId/info/:infoType
// @desc    get infos
// @access  public
router.get('/:collegeId/info/:infoType', async (req, res) => {
    try {

        let college = await College.findById(req.params.collegeId).populate('location');
        let infos = college[req.params.infoType];

        infos = await Info.find({'_id': { $in: infos}}).populate('user');

        res.json(infos.reverse());
        
    } catch (error) {
        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg: 'College not found'});
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/college/:collegeId/info/:infoId/upvote
// @desc    upvote a info
// @access  Private
router.put('/:collegeId/info/:infoId/upvote', auth, async (req, res) => {
    try {

        let info = await Info.findById(req.params.infoId);
        
        let aux = info.upVotes.filter(upvote => upvote.user.toString() === req.user.id);

        //usuário ainda n deu upvote
        if(!aux.length) {
            info.upVotes.push({user: req.user.id});
            await info.save();
        }

        res.json(info);
        
    } catch (error) {
        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg: 'College not found'});
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/college/:collegeId/info/:infoId/downvote
// @desc    downvote a info
// @access  Private
router.put('/:collegeId/info/:infoId/downvote', auth, async (req, res) => {
    try {

        let info = await Info.findById(req.params.infoId);
        
        let aux = info.downVotes.filter(downvote => downvote.user.toString() === req.user.id);

        //usuário ainda n deu downvote
        if(!aux.length) {
            info.downVotes.push({user: req.user.id});
            await info.save();
        }

        res.json(info);
        
    } catch (error) {
        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg: 'College not found'});
        }
        res.status(500).send('Server Error');
    }
});

// @route   POST api/college/:collegeId/info/:infoType
// @desc    Post a new info
// @access  Private
router.post('/:collegeId/info/:infoType', auth, async (req, res) => {
    try {

        const {text} = req.body;

        let newInfo = new Info({
            text,
            user: req.user.id,
            college: req.params.collegeId
        });

        await newInfo.save();

        let college = await College.findById(req.params.collegeId).populate('location');
        college[req.params.infoType].push(newInfo._id);

        await college.save();

        let infos = college[req.params.infoType];

        infos = await Info.find({'_id': { $in: infos}}).populate('user');

        res.json({college, infos: infos.reverse()});
        
    } catch (error) {
        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg: 'College not found'});
        }
        res.status(500).send('Server Error');
    }
});

// @route   GET api/college/:collegeId
// @desc    Get college by id
// @access  Public
router.get('/:collegeId', async (req, res) => {
    try {

        let college = await College.findById(req.params.collegeId).populate('location');

        res.json(college);
        
    } catch (error) {
        console.error(error.message);

        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg: 'College not found'});
        }
        res.status(500).send('Server Error');
    }
});


module.exports = router;