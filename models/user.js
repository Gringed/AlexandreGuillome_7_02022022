module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        email: {
            type: Sequelize.STRING,
            unique: true,
            validate: { isEmail: true }
        },
        password: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        firstName: {
            type: Sequelize.BOOLEAN
        },
        lastName: {
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    }, {
        hooks: {
            beforeCreate: (record, options) => {
                record.dataValues.createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
                record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
            },
            beforeUpdate: (record, options) => {
                record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
            }
        }
    });

    return User;
};