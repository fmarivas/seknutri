const GoogleStrategy = require('passport-google-oauth20').Strategy
const express =require('express')
const router = express.Router()
const passport = require('passport')
const googleauth = require('../controllers/function/googleAuthFunction')

require('dotenv').config()
let userProfile

passport.use(new GoogleStrategy({
    clientID: process.env.ClientId,
    clientSecret: process.env.ClientSecret,
    callbackURL: process.env.redirect_url
  },
  function(accessToken, refreshToken, profile, done) {
	  userProfile = profile
    return done(null, profile);
  }
));

router.get('/google',  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect home.
	req.session.user = userProfile
    res.redirect('/auth/success');
  });

router.get("/success", async (req, res) => {
	try{
		const success = await googleauth.registerWithGoogle(userProfile)
		res.json({success})
	}catch(err){
		console.error(err)
	}
});

module.exports = router