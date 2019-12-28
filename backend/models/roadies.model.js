module.exports = (sequelize, type) => {
    return sequelize.define('roadies', {
        uuid: {
            type: type.UUID,
            defaultValue: type.UUIDV4,
            primaryKey: true
        },
        date: {
            type: type.DATEONLY,
            allowNull: false
        },
        call_time: {
            type: type.TIME,
            allowNull: false
        },
        location: {
            type: type.STRING,
            allowNull: false
        },
        members_needed: {
            type: type.INTEGER,
            allowNull: false
        }
    });
};