module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        email: {
            type: Sequelize.STRING,
            unique: true,
            validate: { isEmail: true }
        },
        password: {
            type: Sequelize.STRING,
            notEmpty: true,
            validate: {
                min: 6
            }
        },
        firstName: {
            type: Sequelize.STRING
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
    });

    return User;
};