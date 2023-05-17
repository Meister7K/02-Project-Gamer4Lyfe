const User = require('../../models/User'); 
const router = require('express').Router();
  

//I never know if im selecting the right files with these imports. someone whos good at file paths hmu -will


//create new user by visiting /api/user

router.post('/', async (req, res) => {
    try {

      const userData = await User.create(req.body); //creates new user in the model
  
      req.session.save(() => {
        req.session.user_id = userData.id;  //for use in searching by profile (see homeroutes)
        req.session.logged_in = true;           //sets as logged in
  
        res.status(200).json(userData);  //idk what this is for why does the signup form need this data back? Im not gonna lie I litterally copied and pasted this from the mini project -Will
      });
    } catch (err) {
      res.status(400).json(err);          
    }
  });


//api/user/login to log into an existing user account stored in the model
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } }); //query of there is there a user with matching email
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password); //checkPassword unscrambles bcrypt thats sent with the user data
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;          //logged in
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });


  //we should probably put a logout button somewhere
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {     //if logged in then log out
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });


module.exports = router;