const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const eventsRouter = require('./routes/events');
const membersRouter = require('./routes/members');
const attendanceRouter = require('./routes/attendance');

app.use('/api/events', eventsRouter);
app.use('/api/members', membersRouter);
app.use('/api/attendance', attendanceRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
