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

    passport.serializeUser((user, done) => done(null, user.member_number));
    passport.deserializeUser((member_number, done) =>
        Member.findOne({ where: { member_number } })
                .then(user => done(null, user))
                .catch(err => done(err, null))
    );

};