const GoogleStrategy = require('passport-google-oauth20').Strategy
const express =require('express')
const router = express.Router()
const passport = require('passport')
const Authorization = require('../controllers/function/authorization')

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
    res.redirect('/auth/success');
  });

router.get("/success", async (req, res) => {
	try{
		await Authorization.handUserGoogleLogin(userProfile, res, req)
	}catch(err){
		console.error(err)
	}
});

module.exports = router