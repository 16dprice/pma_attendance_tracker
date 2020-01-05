const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
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
    const role = req.body.role;

    Member.create({ member_number, first_name, last_name, middle_name, status, role })
        .then(member => res.json('Member added!'))
        .catch(err => res.json(err));

});

router.route('/login').post((req, res, next) => {
    passport.authenticate('local', (err, member, info) => {
        if(err) return next(err);
        req.logIn(member, (err) => {
            if(err) return next(err);
            if(!member) res.json({ errors: info });
            else {
                res.json({ location: '/members', member });
            }
        });
    })(req, res, next);
});

router.route('/current').get((req, res) => {
    res.json(req.user);
});

router.route('/logout').get((req, res) => {
    req.logout();
    res.json({ location: '/' });
});

// TODO: still need update and delete

module.exports = router;
