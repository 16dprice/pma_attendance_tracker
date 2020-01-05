const router = require('express').Router();
const bcrypt = require('bcryptjs');
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
            .then(count => { return {[attendanceVal]: count }}))
    });
    promises.push(Member.findAll({
        where: {
            member_number: req.params.id
        }
    })
        .then(members => { return {name: `${members[0].first_name} ${members[0].last_name}`}})
        .catch(err => res.json(err)));
    Promise.all(promises)
        .then(results => {
            // flatten the object that is returned
            let memberAbsenceInfo = {};
            results.forEach(result => {
                if(result.U !== undefined) memberAbsenceInfo.U = result.U;
                if(result.E !== undefined) memberAbsenceInfo.E = result.E;
                if(result.T !== undefined) memberAbsenceInfo.T = result.T;
                if(result.name !== undefined) memberAbsenceInfo.name = result.name;
            });
            res.json(memberAbsenceInfo);
        })
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

router.route('/login').post((req, res) => {

    const { member_number, password } = req.body;

    Member.findAll({
        where: { member_number }
    })
        .then(members => {

            let errors = [];

            const member_found = members.length === 1; // if exactly one member was found

            if(!member_found) {
                errors.push({ msg: `Member with member number ${member_number} does not exist.` })
            } else {
                bcrypt.compare(password, members[0].password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch) {
                        res.json({location: '/members'});
                    } else {
                        errors.push({ msg: 'Password incorrect' });
                    }
                });
            }
            // res.json({pass: req.body.password});
        })
        .catch(err => res.json(err));

});

// TODO: still need update and delete

module.exports = router;
