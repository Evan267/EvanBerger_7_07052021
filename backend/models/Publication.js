module.exports = (sequelize, Sequelize) => {
    const Publication = sequelize.define('publication', {        
        description: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
    });
    return Publication;
}