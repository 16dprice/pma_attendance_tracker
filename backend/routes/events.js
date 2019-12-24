const router = require('express').Router();
const { Event } = require('../sequelize');

// read all
router.route('/').get((req, res) => {
    Event.findAll({
        where: req.query
    }).then(events => res.json(events));
});

// create
router.route('/add').post((req, res) => {

    const date = req.body.date;
    const call_time = req.body.call_time;
    const description = req.body.description;
    const extra_notes = req.body.extra_notes;

    Event.create({ date, call_time, description, extra_notes })
        .then(event => res.json(event))
        .catch(err => res.json(err));

});

// delete
router.route('/:id').delete((req, res) => {
    // console.log(req.params.id);
    // res.json(req.params.id);
    Event.destroy({
        where: {
            uuid: req.params.id
        }
    })
        .then(() => res.json('Deleted event!'))
        .catch(err => res.status(400).json(err));
});

// TODO: still need update

module.exports = router;
