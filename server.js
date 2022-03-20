const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
require('dotenv').config({ path: './config/.env' })
require("./config/db");
const { checkToken, requireAuth } = require('./middleware/auth')
const cors = require('cors');
const db = require('./config/db');
const app = express();

//Cors
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeader': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,POST,PATCH,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions))

// Parser 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//JSON web token
app.get('*', checkToken);
app.get('/tokenId', requireAuth, (req,res) => {
    res.status(200).json(res.locals.user.id)
})

// Routes entry
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Server entry
db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    })
})

