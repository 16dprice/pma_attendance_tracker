module.exports = (sequelize, type) => {
    return sequelize.define('members', {
        member_number: {
            type: type.INTEGER,
            primaryKey: true
        },
        first_name: {
            type: type.STRING,
            allowNull: false
        },
        last_name: {
            type: type.STRING,
            allowNull: false
        },
        middle_name: type.STRING,
        status: {
            type: type.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active'
        }
    });
};