const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const unsecurePort = process.env.UNSECURE_PORT || 5001;
const securePort = process.env.SECURE_PORT || 5000;

require('./config/passport')(passport);

app.use(cookieParser());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());

const eventsRouter = require('./routes/events');
const membersRouter = require('./routes/members');
const attendanceRouter = require('./routes/attendance');
const roadiesRouter = require('./routes/roadies');
const roadieSignUpRouter = require('./routes/roadie-signup');

app.use('/api/events', eventsRouter);
app.use('/api/members', membersRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/roadies', roadiesRouter);
app.use('/api/roadie-signup', roadieSignUpRouter);

app.listen(unsecurePort, () => {
    console.log(`Server is running on port ${unsecurePort}...`);
});

const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/pmaiotamuattendance.neat-url.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/pmaiotamuattendance.neat-url.com/fullchain.pem")
};

https.createServer(options, app).listen(securePort);
