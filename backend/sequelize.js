const Sequelize = require('sequelize');
const EventModel = require('./models/event.model');
const MemberModel = require('./models/member.model');
const AttendanceModel = require('./models/attendance.model');
const RoadiesModel = require('./models/roadies.model');

require('dotenv').config();

const connection = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql'
    }
);

const Event = EventModel(connection, Sequelize);
const Member = MemberModel(connection, Sequelize);
const Attendance = AttendanceModel(connection, Sequelize);
const Roadies = RoadiesModel(connection, Sequelize);


Attendance.belongsTo(Event, { onDelete: 'cascade' }); // adds eventUuid reference to events table
Attendance.belongsTo(Member); // adds memberMemberNumber reference to members table

const resetDatabase = false;

connection.sync({ force: resetDatabase })
    .then(() => {
        console.log(`Database & tables created!`);

        if(resetDatabase) {
            // init all member records
            const memberCsvPath = './models/members.csv';
            const csvToJson = require('convert-csv-to-json');

            const memberJson = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(memberCsvPath);

            memberJson.forEach(member => {

                const name = member['MemberName'].split(' ');

                Member.create({
                    member_number: member['MemberNumber'],
                    first_name: name[0],
                    last_name: name[2],
                    middle_name: name[1],
                    status: 'active'
                });
            });

        }

    });

module.exports = {
    Event,
    Member,
    Attendance,
    Roadies
};