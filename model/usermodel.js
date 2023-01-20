module.exports = (sequelize, DataTypes) => {
    const Avenger = sequelize.define("avengers", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.BLOB('medium'),
            allowNull: false
        }
    })
    return Avenger;
}
