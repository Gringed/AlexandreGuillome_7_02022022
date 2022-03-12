module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("likes", {
        idUserLike: {
            type: Sequelize.INTEGER
        },
        idPost: {
            type: Sequelize.INTEGER,
        },
    });


    return Like;

};