import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));
  
  router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/failure',
  }), (req, res) => {
    const { user, token } = req.user;
    console.log('Authentication successful:', { user, token });
    res.json({
      message: 'Authentication successful',
      user,
      token,
    });
  });
  
  router.get('/failure', (req, res) => {
    console.error('Authentication failed');
    res.status(401).json({ message: 'Authentication failed' });
  });
  

export default router;