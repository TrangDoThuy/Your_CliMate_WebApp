const express = require('express');
const router = express.Router(); 
const auth = require('../../middleware/auth');
const {check, validationResult} = require("express-validator");

const Profile = require('../../models/Profile');


// @route       GET api/profile/me
// @desc        Get current user profile
// @access      Private
router.get('/me',auth, async(req, res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', 
        ['name','avatar']);

        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'})
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST api/profile
// @desc        Create or update user profile
// @access      Private
router.post('/',[auth,[
        check('status','Status is required')
        .not()
        .isEmpty(),
        check('interested','Interested field is required')
        .not()
        .isEmpty()
    ]
],
async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {
            company,
            location,
            status,
            intro,
            interested,
            experience,
            education,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
        } = req.body;

        // Build profile object

        const profileField = {};
        profileField.user = req.user.id;
        if(company) profileField.company = company;
        if(location) profileField.location = location;
        if(status) profileField.status = status;
        if(intro) profileField.intro = intro;
        if(interested) {
            profileField.interested = interested.split(',').map(skill=>skill.trim());
        }

        // Build social object
        profileField.social = {};
        if(youtube) profileField.social.youtube = youtube;
        if(facebook) profileField.social.facebook = facebook;
        if(twitter) profileField.social.twitter = twitter;
        if(instagram) profileField.social.instagram = instagram;
        if(linkedin) profileField.social.linkedin = linkedin;

        // if(experience) profileField.experience = experience;
        // if(education) profileField.education = education;

        // update and insert data
        try{
            let profile = await Profile.findOne({user: req.user.id});
            if(profile){
                //Update
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileField},
                    {new: true}
                );

                return res.json(profile);
            }

            // create 
            profile = new Profile(profileField);

            await profile.save();
            res.json(profile);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route       GET api/profile
// @desc        Get all profiles
// @access      Public

router.get('/',async(req, res)=>{
    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       GET api/profile/user/:user_id
// @desc        Get profile by user ID
// @access      Public

router.get('/user/:user_id',async(req, res)=>{
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user',['name','avatar']);
       
        if(!profile) 
            return res.status(400).json({msg:'Profile is not found'});
       
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:'Profile is not found'});
        }
        res.status(500).send('Server Error');
    }
});

// @route       DELETE api/profile
// @desc        Delete profile, user & posts
// @access      Private
router.delete('/',auth,async(req, res)=>{
    try {
        //Remove profile
        await Profile.findOneAndRemove({user: req.user.id});
        //Remove user
        await User.findOneAndRemove({_id: req.user.id});
        //Remove user's posts

        res.json({msg: 'User deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       PUT api/profile/experience
// @desc        Add profile experience
// @access      Private
router.put('/experience',[auth,[
        check('title','Title is required')
        .not()
        .isEmpty(),
        check('company','Company is required')
        .not()
        .isEmpty(),
        check('from','From date is required')
        .not()
        .isEmpty(),
        ]
    ], 
    async(req, res)=>{
        const errors = validationResult(req); 
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const{
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({user: req.user.id});

            profile.experience.unshift(newExp);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
);

// @route       DELETE api/profile/experience/:exp_id
// @desc        Delete experience from profile experience
// @access      Private
router.delete('/experience/:exp_id', auth, async(req, res)=>{
    try {
        const profile = await Profile.findOne({user: req.user.id});

        // get remove index 
        const removeIndex = profile.experience
            .map(item=>item.id)
            .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex,1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route       PUT api/profile/education
// @desc        Add profile education
// @access      Private
router.put('/education',[auth,[
    check('school','School is required')
    .not()
    .isEmpty(),
    check('degree','Degree is required')
    .not()
    .isEmpty(),
    check('fieldOfStudy','Study field is required')
    .not()
    .isEmpty(),
    check('from','From date is required')
    .not()
    .isEmpty(),
    ]
], 
async(req, res)=>{
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const{
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id});

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}
);

// @route       DELETE api/profile/education/:edu_id
// @desc        Delete education from profile education
// @access      Private
router.delete('/education/:edu_id', auth, async(req, res)=>{
try {
    const profile = await Profile.findOne({user: req.user.id});

    // get remove index 
    const removeIndex = profile.education
        .map(item=>item.id)
        .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex,1);

    await profile.save();

    res.json(profile);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
});


module.exports = router;