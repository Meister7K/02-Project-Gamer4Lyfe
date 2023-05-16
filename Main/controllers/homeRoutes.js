// post for signup and login
//! get to login page
//! get to homepage
// get to gamepage, only once logged in
// get profile, only once logged in

const router = require('express').Router();

router.get('/', async(req, res) => {
    try {
        return res.render('homepage');
    } catch {
        res.status(500).json(err);
    }
})

router.get('/login',async(req,res)=> {
    try{
        return res.render('login');
    }catch{
        res.status(500).json(err);
    }
})

router.get('/gamepage',async(req,res)=> {
    try{
        return res.render('game');
    }catch{
        res.status(500).json(err);
    }
})

router.get('/settings',async(req,res)=>{
    try{
        return res.render('settings');
    }catch{
        res.status(500).json(err);
    }
})

router.get('/gamecontrols',async(req,res)=>{
    try{
        return res.render('gameControls');
    }catch{
        res.status(500).json(err);
    }
})

router.get('/profile',async(req,res)=>{
    try{
        return res.render('profile');
    }catch{
        res.status(500).json(err);
    }
})

router.get('/savegame',async(req,res)=>{
    try{
        return res.render('saveGame');
    }catch{
        res.status(500).json(err);
    }
})

// post for sign up and login
// login git

// gamepage git
// profile.git
// 

module.exports = router;