module.exports = (sequelize, type) => {
    return sequelize.define('attendance', {
        attendance: {
            type: type.ENUM('P', 'E', 'U', 'T'),
            comment: 'present, excused, unexcused, tardy',
            allowNull: false,
            defaultValue: 'P'
        },
        extra_notes: {
            type: type.STRING,
            comment: 'reason for absence, why excused, etc'
        }
    });
};