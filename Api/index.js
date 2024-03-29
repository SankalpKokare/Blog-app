const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://blog:9Nu1nB03zo69rgof@cluster0.sg2s1ub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({ username, password });
        res.json(userDoc)
    } catch (e) {
            res.status(400).json(e);
    }

})

app.listen(4000);
//mongodb+srv://blog:9Nu1nB03zo69rgof@cluster0.sg2s1ub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//9Nu1nB03zo69rgof