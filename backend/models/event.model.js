module.exports = (sequelize, type) => {
    return sequelize.define('events', {
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
        description: {
            type: type.STRING,
            allowNull: false
        },
        extra_notes: type.TEXT
    });
};