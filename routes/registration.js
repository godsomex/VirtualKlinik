const User = require('../models/user'); // since we exported our user in models/user.js, we can therefore import it here 
const jwt = require('jsonwebtoken')
const settings = require ('../settings/dbase');
module.exports = (router) =>{ //passing in our express router as argument 
    router.post('/register', (req, res) => {

        if (!req.body.email){
            res.json({success:false, message: 'you must enter an email'});
            }else{
            if (!req.body.username) {
                res.json({ success: false, message: 'you must enter an username' });
            }else{
                if (!req.body.password) {
                    res.json({ success: false, message: 'you must enter a password' }); 
                }else{
                    let user = new User({
                        email : req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    user.save((err) => {
                        if (err) {
                             res.json({ success: false, message:'could not save user. Error: ', err});
                        }else{
                             res.json({success: true, message: 'saved new user'});
                        }
                    });
                }
            }
            
        }        
    });

    router.post('/login', (req, res) => {
        if (!req.body.username) {
            res.json({ success: false, message: 'No username entered' });
        } else {
            if (!req.body.password) {
                res.json({ success: false, message: 'No username entered' });
            } else {
                User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        if (!user) {
                            res.json({ success: false, message: 'user not found in the database' });
                        } else {
                            const correctPassword = user.comparePassword(req.body.password);
                            if (correctPassword) {
                                token = jwt.sign({userId: user._id}, settings.secret, {expiresIn:'24h'});
                                res.json({ success: true, message: 'success with login', token: token, user: { username: user.username }  });
                            } else {
                                res.json({ success: false, message: 'invalid password'});
                            }
                        }
                    }
                });
            }
        }

    });

//middleware method/token used to grab token from user's header 
    router.use((req, res, next) => {
        const token = req.headers['authorization']; 
        if (!token) {
            res.json({ success: false, message: 'No token provided' });
        } else {
            jwt.verify(token, settings.secret, (err, decoded) => {
                
                if (err) {
                    res.json({ success: false, message: 'invalid token: ' + err }); 
                } else {
                    req.decoded = decoded; // Create global variable to use in any request beyond
                    next(); // Exit middleware
                }
            });
        }
    });

    router.get('/profile', (req, res) => {
        // method to search for a user in the database 
        User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
           
            if (err) {
                res.json({ success: false, message: err }); // Return error
            } else {
                // Check if user was found in database
                if (!user) {
                    res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
                } else {
                    res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
                }
            }
        });
    });
    return router; //this is how we return our api routes 

    //app.use('/chat', chat);



}