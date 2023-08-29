const express = require('express');
const { chats } = require('./dummyData/data') // Taking the chats from the dummy data
const dotenv = require('dotenv'); // Dotenv to ensure that the port or data is not publically visible

const app = express();

app.get('/', (req, res) => {
    res.send("API running ")
});

// To get all the chats from the request
app.get('/api/chat', (req, res) => {
    res.send(chats);
})

// If ID of chat is known then the required chat can be printed out 
app.get('/api/chat/:id', (req, res) => {
    const singleChat = chats.find(c => c._id === req.params.id);
    res.send(singleChat);
})

// Dotenv to get the port stored in it
const PORT = process.env.PORT | 5000
app.listen(PORT, console.log(`Port running on ${PORT}`));