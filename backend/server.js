const express = require('express');
const cors = require('cors');
const passport = require('passport');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());

const eventsRouter = require('./routes/events');
const membersRouter = require('./routes/members');
const attendanceRouter = require('./routes/attendance');
const roadiesRouter = require('./routes/roadies');

app.use('/api/events', eventsRouter);
app.use('/api/members', membersRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/roadies', roadiesRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
