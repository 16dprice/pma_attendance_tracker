const router = require('express').Router();
const { Roadies, RoadieSignUp } = require('../sequelize');

router.route('/roadie/:uuid').get((req, res) => {
    Roadies.findOne({
        where: { uuid: req.params.uuid }
    })
        .then(roadie => {
            // roadie will be null if it does not exist
            if(roadie) {
                RoadieSignUp.findAll({
                    where: { roadyUuid: req.params.uuid }
                })
                    .then(signUps => {
                        res.json({
                            roadie,
                            signUps // empy array if no one has signed up yet
                        });
                    })
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));
});

module.exports = router;
