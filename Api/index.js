const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const secret = 'sdsfaldskfdsfk4545454sdasd4sa5da5s4';
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://blog:9Nu1nB03zo69rgof@cluster0.sg2s1ub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({ username, password: bcrypt.hashSync(password, salt) });
        res.json(userDoc)
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }

})


app.post('/login', async (req, res) => {
    // console.log(req.body);
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username: username });
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
        //logged in
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json('ok');
        })
    } else {
        res.status(400).json('wrong credentials');
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
    res.json(req.cookies);

})


app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})


app.listen(4000);
//mongodb+srv://blog:9Nu1nB03zo69rgof@cluster0.sg2s1ub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//9Nu1nB03zo69rgof