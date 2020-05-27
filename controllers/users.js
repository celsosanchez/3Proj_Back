const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// const passport = require("passport");

// Load input validation
const validateRegisterInput = require("./register");
const validateLoginInput = require("./login");

// Load User model
const User = require("../schema/User");


// @route POST api/users/register
// @desc Register user
// @access Public
function register(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
        return res.status(400).json({ email: "Email déjà utilisé" });
        } 
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    // newUser.then(user => res.json(user))
                    newUser.then(user => res.status(200).json({text: "User Created : " + user}))
                    // newUser.catch(err => console.log(err));
                    newUser.catch(err => res.status(500).json({text: "Error creating a user : " + err }))
                });
            });
        }
    });
}





// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
function login(req, res) {
  // Form validation

    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 1*60*60 // 1 year in seconds //31556926 1y
                    },
                    (err, token) => {
                        res.json({
                        success: true,
                        token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
};


exports.register = register;
exports.login = login;