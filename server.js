const express = require('express');
const cors = require('cors');
const app = express();
const port = 8888;
const userRoute = require('./router/user');
const questionRoute = require('./router/question');
const levelRoute = require('./router/level');
const progresRoute = require('./router/progres');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require('./models')
db.sequelize.sync()

app.get('/', (req, res) => {
    res.send('Welcome!');
});

app.use('/api/user', userRoute)
app.use('/api/question', questionRoute)
app.use('/api/level', levelRoute)
app.use('/api/progres', progresRoute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => console.log(`Server running at http://localhost:${port}!`));