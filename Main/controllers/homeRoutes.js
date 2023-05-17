// post for signup and login
//! get to login page
//! get to homepage
// get to gamepage, only once logged in
// get profile, only once logged in

const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User } = require('../models/User');

router.get('/', async(req, res) => {
    //homepage route
    try {
        return res.render('homepage');
    } catch {
        res.status(500).json(err);
    }
})

router.get('/play', withAuth, async(req,res)=> { //!
    //loads game to page
    try{
        return res.render('game');
    }catch{
        res.status(500).json(err);
    }
})

router.get('/settings',withAuth,async(req,res)=>{
    //to settings page
    try{
        return res.render('settings');
    }catch{
        res.status(500).json(err);
    }
})


router.get('/profile',withAuth,async(req,res)=>{
    //checks for authorization then sends to profile
    try{
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {attributes: { exclude: ['password'] }}); //specify included and excluded data here
  
        const user = userData.get({ plain: true });  //parses userdata
        
        //sends off relevant user data to profile and sets them as logged in if they arent already
        res.render('profile', {      
            ...user,
            logged_in: true
        });
    } catch{
        res.status(500).json(err);
    }
})

router.get('/saveGame',withAuth,async(req,res)=>{
    try{
        return res.render('saveGame');
    }catch{
        res.status(500).json(err);
    }
})

//this one may not be nesecary since our login/signup page is the first page they see, but imma leave it here for safety reasons -Will

router.get('/login', (req, res) => {    
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('/homepage');  //send back to homepage (login?)
  });

// post for sign up and login
// login git

// gamepage git
// profile.git
// 

module.exports = router;