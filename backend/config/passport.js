const LocalStrategy = require('passport-local');
const { Member } = require('../sequelize');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'member_number' }, (member_number, password, done) => {
            Member.findOne({ where: { member_number } })
                .then(member => {
                    if(!member) {
                        return done(null, false, { message: 'The member number given is not registered.' });
                    }

                    bcrypt.compare(password, member.password, (err, isMatch) => {
                        if(err) throw err;
                        if(isMatch) {
                            return done(null, member);
                        } else {
                            return done(null, false, { message: 'Password incorrect.' });
                        }
                    })
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((member, done) => done(null, member.member_number));
    // not sure if this will work?
    passport.deserializeUser((id, done) => Member.findOne({ where: { member_number: id } })
        .then(member => done(null, member))
        .catch(err => done(err, null))
    );

};