const router = require('express').Router();
const { Member, Attendance } = require('../sequelize');

// use a 'where' clause (which uses AND, not OR)
router.route('/').get((req, res) => {
    Member.findAll({
        where: req.query
    }).then(users => res.json(users));
});

router.route('/absences/:id').get((req, res) => {
    let promises = [];
    ['U', 'E', 'T'].map(attendanceVal => {
        promises.push(Attendance.count({
            where: {
                memberMemberNumber: req.params.id,
                attendance: attendanceVal
            }
        })
            .then(count => { return {[`"${attendanceVal}"`]: count} }))
    });
    Promise.all(promises)
        .then(counts => res.json(counts))
        .catch(err => res.json(err));
});

// create
router.route('/add').post((req, res) => {

    const member_number = req.body.member_number;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const middle_name = req.body.middle_name;
    const status = req.body.status;

    Member.create({ member_number, first_name, last_name, middle_name, status })
        .then(member => res.json('Member added!'))
        .catch(err => res.json(err));

});

// TODO: still need update and delete

module.exports = router;
