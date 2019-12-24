const router = require('express').Router();
const { Member, Attendance } = require('../sequelize');

// read all
router.route('/').get((req, res) => {
    Attendance.findAll({
        where: req.query
    }).then(records => res.json(records));
});

router.route('/attendance-list').get((req, res) => {

    Attendance.findAll({
        where: req.query
    })
        .then(records => {

            let promises = [];

            for (const record of records) {
                promises.push(Member.findAll({
                        where: {
                            member_number: record.memberMemberNumber
                        },
                        limit: 1
                    })
                        .then(members => {
                            return {
                                id: record.id,
                                attendance: record.attendance,
                                extra_notes: record.extra_notes,
                                eventUuid: record.eventUuid,
                                memberMemberNumber: record.memberMemberNumber,
                                first_name: members[0].first_name,
                                last_name: members[0].last_name
                            };
                        })
                );
            }

            Promise.all(promises).then(results => res.json(results));
        });
});

// create
router.route('/add').post((req, res) => {

    const eventUuid = req.body.eventUuid;
    const memberMemberNumber = req.body.memberMemberNumber;
    const attendance = req.body.attendance;
    const extra_notes = req.body.extra_notes;

    Attendance.create({ eventUuid, memberMemberNumber, attendance, extra_notes })
        .then(attendance => res.json('Attendance record added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

// create a full attendance record for an event
router.route('/add_records').post((req, res) => {
    const eventUuid = req.body.eventUuid;
    const memberNumbers = req.body.memberNumbers;

    let promises = [];

    for(const memNum of memberNumbers) {
        promises.push(
            Attendance.create({
                eventUuid,
                memberMemberNumber: memNum
            })
            .then(attendance => { return 'Attendance record added!' })
            .catch(err => res.json(err))
        );
    }

    Promise.all(promises).then((results) => res.json(results));

});

router.route('/update/:id').post((req, res) => {
    Attendance.findAll({
        where: {
            id: req.params.id
        },
        limit: 1
    })
        .then(attendanceRecords => {
            attendanceRecords[0].attendance = req.body.attendance;

            attendanceRecords[0].save()
                .then(record => res.json('Attendance record updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// TODO: still need delete

module.exports = router;
