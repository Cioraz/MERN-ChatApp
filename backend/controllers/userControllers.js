const asyncHandler = require('express-async-handler') // TO check for any kind of errors
const User = require('../models/userModel');
const generateToken = require("../config/generateToken");


// To register the user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body; // Taking all required inputs from the front end

    // If any are not filled then error
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all fields")
    }

    // Find if such a user exists
    const userExists = await User.findOne({ email })

    // If user exists then make the status code of 400
    if (userExists) {
        res.status(400); // Bad error request
        throw new Error("User already exists"); // Since user already exists
    }

    // Create the user making use of the model
    const user = await User.create({
        name,
        email,
        password,
        pic,
    })

    // If created user exists then return the true json value
    if (user) {

        // 201 is the code for success
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("Failed to create User")
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });


    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });

    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
})

// /api/user?search=name
// using queries
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }, // i is case sensitive
        ],

    }
        : {};
    // all users except loggin in user
    const users = await User.find(keyword)
        .find({ _id: { $ne: req.user._id } }).select("-password"); // to prevent the current user from being signed in
    res.send(users);

});

module.exports = { registerUser, authUser, allUsers };