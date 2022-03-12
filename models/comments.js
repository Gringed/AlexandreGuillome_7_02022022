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

    });


    return Comment;

};