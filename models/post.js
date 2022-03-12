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
        userId: {
            type: Sequelize.STRING,
        },
        comments: {
            type: Sequelize.INTEGER
        }

    });


    return Post;

};
