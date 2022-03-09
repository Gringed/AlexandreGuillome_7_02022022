module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("likes", {
        idUserLike: {
            type: Sequelize.INTEGER
        },
        idPost: {
            type: Sequelize.INTEGER,
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


    return Like;

};