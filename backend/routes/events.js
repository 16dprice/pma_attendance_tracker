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

// TODO: still need update and delete

module.exports = router;
