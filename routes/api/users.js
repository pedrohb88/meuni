const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const College = require('../../models/College');
const Location = require('../../models/Location');
const Profile = require('../../models/Profile');

// @route   POST api/user
// @desc    Register user
// @access  Public
router.post('/', [
    check('name', 'Nome é obrigatório').not().isEmpty(),
    check('email', 'Por favor, insira um email válido').isEmail(),
    check('password', 'Por favor, insira uma senha com 6 ou mais caracteres.').isLength({min: 6}),
    check('location', 'Por favor, preencha sua cidade').not().isEmpty()
], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { name, email, password, location, collegeID} = req.body;
    try {

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({errors: [{msg: 'Usuário já existente.'}]});
        }

        let loc = await Location.find(location);
      
        user = new User({name, email, password});
        user.location = loc[0]._id;
  
        if(collegeID && collegeID !== ''){
            user.college = collegeID;
            user.role = 'moderator';
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        let profile = new Profile({user: user.id});
        profile.badges = [];

        await profile.save();

        const payload = {
            user: {
                id: user.id,
            }
        };

        jwt.sign(payload, process.env['JWT_SECRET'], {
            expiresIn: 3600000 //placeholder while testing
        }, (err, token) => {

            if(err) throw err;
            res.json({token});
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;