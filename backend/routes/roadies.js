const router = require('express').Router();
const { Roadies } = require('../sequelize');

// read all
router.route('/').get((req, res) => {
    Roadies.findAll({
        where: req.query
    }).then(roadies => res.json(roadies));
});

router.route('/:uuid').get((req, res) => {
    Roadies.findOne({
        where: { uuid: req.params.uuid }
    })
        .then(roadie => res.json(roadie))
        .catch(err => res.json(err));
});

// create
router.route('/add').post((req, res) => {

    const date = req.body.date;
    const call_time = req.body.call_time;
    const location = req.body.location;
    const members_needed = req.body.members_needed;

    Roadies.create({ date, call_time, location, members_needed })
        .then(event => res.json(event))
        .catch(err => res.json(err));

});

// delete
router.route('/:id').delete((req, res) => {
    Roadies.destroy({
        where: {
            uuid: req.params.id
        }
    })
        .then(() => res.json('Deleted Roadie!'))
        .catch(err => res.status(400).json(err));
});

module.exports = router;
