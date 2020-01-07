const router = require('express').Router();
const { Member, RoadieSignUp } = require('../sequelize');

// get all info needed for roadie sign up page
router.route('/members/:roadyUuid').get((req, res) => {
    RoadieSignUp.findAll({
        where: { roadyUuid: req.params.roadyUuid }
    })
        .then(signUps => {
            const memberNumbers = signUps.map(signUp => signUp.memberMemberNumber);
            Member.findAll({
                where: { member_number: memberNumbers }
            })
                .then(members => res.json(members))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
});

router.route('/add').post((req, res) => {

    const memberMemberNumber = req.body.member_number;
    const roadyUuid = req.body.roadieUuid;

    RoadieSignUp.create({ memberMemberNumber, roadyUuid })
        .then(roadie => res.json(roadie))
        .catch(err => res.json(err));

});

router.route('/').delete((req, res) => {
    RoadieSignUp.destroy({
        where: req.query
    })
        .then(() => res.json('Deleted Sign Up.'))
        .catch(err => res.json(err));
});

module.exports = router;
