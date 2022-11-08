const express = require('express');
const User = require('./User/User')
const app = express();

app.use(express.json())

app.post('/api/1.0/users', (req, res) => {
  User.create(req.body).then(()=>{
    return res.status(200).send({ message: 'User Registered Successfully' });
  })
});

module.exports = app;
