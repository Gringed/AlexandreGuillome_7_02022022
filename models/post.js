module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        imagePost: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        video: {
            type: Sequelize.STRING,
        },
        likes: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.STRING,
        },
        comments: {
            type: Sequelize.INTEGER
        }

    });


    return Post;

};
