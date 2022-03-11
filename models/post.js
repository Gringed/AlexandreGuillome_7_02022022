module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        imagePost: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        likes: {
            type: Sequelize.INTEGER
        },
        usersLiked: {
            type: Sequelize.JSON
        },
        userId: {
            type: Sequelize.STRING,
        },
        comments: {
            type: Sequelize.INTEGER
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


    return Post;

};
