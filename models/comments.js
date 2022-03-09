module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
        userId: {
            type: Sequelize.INTEGER
        },
        idPost: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        message: {
            type: Sequelize.INTEGER
        },
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },

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


    return Comment;

};