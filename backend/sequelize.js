const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const EventModel = require('./models/event.model');
const MemberModel = require('./models/member.model');
const AttendanceModel = require('./models/attendance.model');
const RoadiesModel = require('./models/roadies.model');
const RoadieSignUpModel = require('./models/roadie-signup.model');

require('dotenv').config();

const connection = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        port: process.env.MYSQL_PORT
    }
);

const Event = EventModel(connection, Sequelize);
const Member = MemberModel(connection, Sequelize);
const Attendance = AttendanceModel(connection, Sequelize);
const Roadies = RoadiesModel(connection, Sequelize);
const RoadieSignUp = RoadieSignUpModel(connection, Sequelize);


Attendance.belongsTo(Event, { onDelete: 'cascade' }); // adds eventUuid reference to events table
Attendance.belongsTo(Member); // adds memberMemberNumber reference to members table

RoadieSignUp.belongsTo(Member, { onDelete: 'cascade' }); // adds memberMemberNumber reference to roadie sign up table
RoadieSignUp.belongsTo(Roadies, { onDelete: 'cascade' }); // adds roadyUuid reference to roadie sign up table

const resetDatabase = false;
// const resetDatabase = true;

connection.sync({ force: resetDatabase })
    .then(() => {
        console.log(`Database & tables created!`);

        // if(resetDatabase) {
        //     const memberJson = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(memberCsvPath);
        //
        //     memberJson.forEach(member => {
        //
        //         const name = member['MemberName'].split(' ');
        //
        //         // default password is 'password'
        //         let hash = bcrypt.hashSync('password', 10);
        //         Member.create({
        //             member_number: member['MemberNumber'],
        //             first_name: name[0],
        //             last_name: name[2],
        //             middle_name: name[1],
        //             status: 'active',
        //             password: hash
        //         });
        //
        //
        //     });
        //
        // }

    });

module.exports = {
    Event,
    Member,
    Attendance,
    Roadies,
    RoadieSignUp
};